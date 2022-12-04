import { html, css, LitElement } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { SwitchManagerBlueprintButtonAction, SwitchManagerConfigButtonAction } from "./types";
import { HomeAssistant } from "@hass/types";

@customElement('switch-manager-button-actions')
class SwitchManagerButtonActions extends LitElement 
{
    @property() hass!: HomeAssistant;

    @property() blueprint_actions: SwitchManagerBlueprintButtonAction[];

    @property() config_actions: SwitchManagerConfigButtonAction[];
    
    @property({reflect: true}) index = 0;

    render() 
    {
        if( !this.blueprint_actions || this.blueprint_actions.length == 1 )
            return '';
        return html`
            <div id="tabbar" .hass=${this.hass}>
                <paper-tabs selected="${this.index}" @iron-select=${this._tab_changed}>
                    ${this.blueprint_actions.map((a, i) => 
                        html`
                        <paper-tab>${a.title}
                            ${this.config_actions[i].sequence.length ? html`<ha-chip>${this.config_actions[i].sequence.length}</ha-chip>`:''}
                        </paper-tab>`)}
                </paper-tabs>
            </div> 
        `;
    }

    _render

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
            ha-chip {
                position: absolute;
                top: 0;
                right: -32px;
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