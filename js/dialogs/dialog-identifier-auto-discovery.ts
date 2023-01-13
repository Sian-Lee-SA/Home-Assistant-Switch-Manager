import { css, CSSResultGroup, html, LitElement, TemplateResult } from "lit";
import { customElement, property, state, query } from "lit/decorators.js";
import { createCloseHeading } from "../../ha-frontend/components/ha-dialog";
import { haStyle, haStyleDialog } from "../../ha-frontend/resources/styles"
import { fireEvent } from "../../ha-frontend/common/dom/fire_event";
import "@material/mwc-button";
import "../../ha-frontend/components/ha-textfield";
import { SwitchManagerBlueprint } from "../types";
import { buildWSPath, getValueById } from "../helpers";

declare global {
    interface HTMLElementTagNameMap {
        "switch-manager-dialog-identifier-auto-discovery": SwitchManagerDialogIdentifierAutoDiscovery;
    }
}

@customElement('switch-manager-dialog-identifier-auto-discovery')
class SwitchManagerDialogIdentifierAutoDiscovery extends LitElement 
{
    @property({ attribute: false }) public hass!: any;

    @state() private _opened = false;
  
    @state() private _error?: string;

    private _params!: any; 

    @state() private _identifier?: string;

    @state() private _blueprint?: SwitchManagerBlueprint;

    @state() private _dirty: boolean = false;

    @state() private _subscribedAutoDiscovery?: () => void;

    @property({reflect: true, type: Boolean}) listening: boolean = false;

    @query('#identifier-input') identifier_input;

    public showDialog(params: any): void 
    {
        this._opened = true;
        this._error = undefined;
        this._params = params;
        this._dirty = false;
        this._identifier = params.identifier;
        this._blueprint = params.blueprint;
    }

    public closeDialog(): void 
    {
        this._stopListener();
        this._params.onClose();
    
        if (this._opened) {
            fireEvent(this, "dialog-closed", { dialog: this.localName });
        }
        this._opened = false;
    }

    protected render(): TemplateResult 
    {
        if (!this._opened) {
            return html``;
        }
        return html`
            <ha-dialog
                open
                scrimClickAction
                @closed=${this.closeDialog}
                .heading="${createCloseHeading(this.hass, 'Identifier')}">
                ${this._error ? html`<ha-alert alert-type="error">${this._error}</ha-alert>` : ""}
                ${this._blueprint!.info ? html`<ha-alert alert-type="info">${this._blueprint!.info}</ha-alert>`: ''}

                <ha-textfield 
                    id="identifier-input" 
                    type="text" 
                    .value="${this._identifier}" 
                    required="true" 
                    .label=${this._blueprint!.event_type == 'mqtt'? 'mqtt topic' : this._blueprint!.identifier_key}
                    @input="${this._identifierChanged}"></ha-textfield>

                ${this._subscribedAutoDiscovery ? html`
                    <ha-alert alert-type="info">
                        Press a button on your switch
                    </ha-alert>` : ''}

                ${this._blueprint!.event_type != 'mqtt' || this._blueprint!.mqtt_topic_format ? html`
                <mwc-button id="discovery-button" @click=${this._toggleAutoDiscovery}>
                    Auto Discover
                </mwc-button>` : ''}

                <mwc-button @click=${this.closeDialog} slot="secondaryAction">
                    Cancel
                </mwc-button>
                <mwc-button @click=${this._save} slot="primaryAction" .disabled=${this._error || ! this._identifier || ! this._dirty}>
                    Update
                </mwc-button>
            </ha-dialog>
        `;
    }

    static get styles(): CSSResultGroup {
        return [
          haStyle,
          haStyleDialog,
          css`
            @keyframes pulse {
                from {
                    opacity: 1;
                }
                to {
                    opacity: 0.4;
                }
            }
            ha-dialog {
                --mdc-dialog-min-width: 600px;
                --mdc-dialog-max-width: 600px;
            }
            ha-textfield,
            ha-textarea {
              display: block;
            }
            ha-alert {
              display: block;
              margin-bottom: 16px;
            }
            #discovery-button {
                background: var(--primary-color);
                --mdc-theme-primary: white;
                display: flex;
                margin: 5px auto;
            }
            :host([listening]) #discovery-button {
                animation: 1s infinite alternate pulse;
            }
          `,
        ];
    }

    private async _toggleAutoDiscovery()
    {
        // Act as a toggle
        if( this._stopListener() )
            return;
    
        this.listening = true;
        this._subscribedAutoDiscovery = await this.hass.connection.subscribeMessage((msg) => {
            this.identifier_input.value = msg.identifier;
            this._stopListener();
            this._identifierChanged();
        }, { type: buildWSPath('blueprints/auto_discovery'), blueprint_id: this._blueprint!.id });
    }

    private _stopListener()
    {
        if( this._subscribedAutoDiscovery )
        {
            this._subscribedAutoDiscovery();
            this._subscribedAutoDiscovery = undefined;
            this.listening = false;
            return true;
        }
        return false;
    }

    private _identifierChanged(ev?: CustomEvent)
    {
        this._identifier = getValueById(this, 'identifier-input');;
        this._dirty = true;
    }

    private _save()
    {
        if ( ! this._identifier ) {
            this._error = "Identifier is required";
            return;
        }
        this._params.update({
            identifier: this._identifier
        });
        this.closeDialog();
    }
}