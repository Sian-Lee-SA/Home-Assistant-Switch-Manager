import { html, css, LitElement } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";
import { SwitchManagerBlueprintButtonAction, SwitchManagerConfigButtonAction } from "./types";
import {
    mdiPanHorizontal
} from "@mdi/js";
import "@polymer/paper-tabs";
import { PaperTabsElement } from "@polymer/paper-tabs"

declare global {
    interface HTMLElementTagNameMap {
      "switch-manager-button-actions": SwitchManagerButtonActions;
    }
}

@customElement('switch-manager-button-actions')
class SwitchManagerButtonActions extends LitElement 
{
    @property() hass!: any;

    @property() blueprint_actions!: SwitchManagerBlueprintButtonAction[];

    @property() config_actions!: SwitchManagerConfigButtonAction[];
    
    @property({reflect: true}) index = 0;

    @state() scrollable = true;

    @query('paper-tabs', true) tabs?: PaperTabsElement;


    render() 
    {
        if( !this.blueprint_actions || this.blueprint_actions.length == 1 )
            return '';
        return html`
            <paper-tabs selected="${this.index}" @iron-select=${this._tab_changed} ?scrollable=${this.scrollable}>
                ${this.blueprint_actions.map((a, i) => 
                    html`
                    <paper-tab index="${i}">${a.title}
                        ${this.config_actions[i].sequence.length ? html`<ha-chip>${this.config_actions[i].sequence.length}</ha-chip>`:''}
                    </paper-tab>
                    ${a.title == 'init' ? html`<div id="init-suffix"><ha-svg-icon slot="graphic" .path=${mdiPanHorizontal}></ha-svg-icon></div>` : ''}`
                )}
            </paper-tabs>
        `;
    }

    static get styles() {
        return css`        
            @keyframes feedback {
                to {
                    border-color: #00e903;
                    color: #00e903;
                }
            }
            :host {
                display: flex;
                justify-content: center;
                --paper-tab-ink: transparent;
                --paper-tabs-selection-bar-color: transparent;
            }
            paper-tabs {
                display: grid;
                justify-content: center;
                flex: 1 1 0%;
                height: var(--header-height);
                margin: 0 10px;
            }
            paper-tabs[scrollable] {
                display: flex;
            }
            paper-tab {
                padding: 0px 32px;
                box-sizing: border-box;
                text-transform: uppercase;
            }
            paper-tab[feedback] {
                animation: 0.4s feedback;
                animation-iteration-count: 2;
                animation-direction: alternate;
            }
            paper-tab.iron-selected {
                border-bottom: 2px solid var(--primary-color);
                color: var(--primary-color);
            }
            ha-chip {
                position: absolute;
                top: 0;
                right: -32px;
            }
            #init-suffix {
                display: var(--layout-inline_-_display);
                -ms-flex-align: var(--layout-center_-_-ms-flex-align);
                -webkit-align-items: var(--layout-center_-_-webkit-align-items);
                align-items: var(--layout-center_-_align-items);
                -ms-flex-pack: var(--layout-center-justified_-_-ms-flex-pack);
                -webkit-justify-content: var(--layout-center-justified_-_-webkit-justify-content);
                justify-content: var(--layout-center-justified_-_justify-content);
                -ms-flex: var(--layout-flex-auto_-_-ms-flex);
                -webkit-flex: var(--layout-flex-auto_-_-webkit-flex);
                flex: var(--layout-flex-auto_-_flex);
                position: relative;
                padding: 0 12px;
                overflow: hidden;
                vertical-align: middle;
                font-family: var(--paper-font-common-base_-_font-family);
                -webkit-font-smoothing: var(--paper-font-common-base_-_-webkit-font-smoothing);
            }
        `;
    }

    protected async updated(changedProperties: Map<string, any>) 
    {
        if( !this.tabs )
            return;
        if (changedProperties.has('config_actions')) {
            // Set scrollable to get a proper width calculation
            this.scrollable = true;
            
            await this.updateComplete;

            let width = 0;
            for (let element of this.tabs.children) {
                width += (<HTMLElement>element).offsetWidth;
            }
            this.scrollable = width > this.tabs.offsetWidth;
        }
    }

    public flash( index: number )
    {
        const element = this.tabs?.querySelector(`[index="${index}"]`);
        if( ! element )
            return;
        element.removeAttribute('feedback');
        element.setAttribute('feedback', '');
        setTimeout(() => {
            element!.removeAttribute('feedback');
        }, 1000);
    }

    private _tab_changed( ev: CustomEvent )
    {
        let event = new CustomEvent('changed', {
            detail: {
                index: ev.detail.item.parentNode.indexOf(ev.detail.item)
            }
        });
        this.dispatchEvent(event);
    }
}