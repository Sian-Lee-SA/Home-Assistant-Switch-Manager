import { html, css, LitElement } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { SwitchManagerBlueprintButtonAction } from "./types";

@customElement('switch-manager-button-actions')
class SwitchManagerButtonActions extends LitElement 
{
    @property() hass!: any;
    @state() actions: SwitchManagerBlueprintButtonAction[];
    @property({reflect: true}) index = 0;

    render() 
    {
        if( !this.actions || this.actions.length == 1 )
            return
        return html`
            <div id="tabbar" .hass=${this.hass}>
                <paper-tabs selected="${this.index}" @iron-select=${this._tab_changed}>
                    ${this.actions.map(i => html`<paper-tab>${i.title}</paper-tab>`)}
                </paper-tabs>
            </div> 
        `;
    }

    static get styles() {
        return css`
            :host {
                display: flex;
                justify-content: center;
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
            paper-tab.iron-selected {
                border-bottom: 2px solid var(--primary-color);
                color: var(--primary-color);
            }
        `;
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