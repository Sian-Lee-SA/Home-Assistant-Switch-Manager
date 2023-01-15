import { html, css, LitElement } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import { SwitchManagerBlueprintButtonAction, SwitchManagerConfigButtonAction } from "./types";
import {
    mdiPanHorizontal
} from "@mdi/js";
import "@polymer/paper-tabs";

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

    @query('paper-tabs') tabs;

    render() 
    {
        if( !this.blueprint_actions || this.blueprint_actions.length == 1 )
            return '';
        return html`
            <div id="tabbar" .hass=${this.hass}>
                <paper-tabs selected="${this.index}" @iron-select=${this._tab_changed}>
                    ${this.blueprint_actions.map((a, i) => 
                        html`
                        <paper-tab index="${i}">${a.title}
                            ${this.config_actions[i].sequence.length ? html`<ha-chip>${this.config_actions[i].sequence.length}</ha-chip>`:''}
                        </paper-tab>
                        ${a.title == 'init' ? html`<div id="init-suffix"><ha-svg-icon slot="graphic" .path=${mdiPanHorizontal}></ha-svg-icon></div>` : ''}`)}
                </paper-tabs>
                
            </div> 
        `;
    }

    _render

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
                display: flex;
                justify-content: center;
                flex: 1 1 0%;
                height: var(--header-height);
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
                display: flex;
                align-items: center;
            }
        `;
    }

    public flash( index )
    {
        const element = this.tabs.querySelector(`[index="${index}"]`);
        element.removeAttribute('feedback');
        element.setAttribute('feedback', '');
        setTimeout(() => {
            element.removeAttribute('feedback');
        }, 1000);
    }

    _tab_changed(ev)
    {
      let event = new CustomEvent('changed', {
        detail: {
          index: ev.detail.item.parentNode.indexOf(ev.detail.item)
        }
      });
      this.dispatchEvent(event);
    }

}