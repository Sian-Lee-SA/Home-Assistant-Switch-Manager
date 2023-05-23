import { css, CSSResultGroup, html, LitElement, TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { createCloseHeading } from "../../ha-frontend/components/ha-dialog";
import { haStyle, haStyleDialog } from "../../ha-frontend/resources/styles";
import { fireEvent } from "../../ha-frontend/common/dom/fire_event";
import { buildWSPath } from "../helpers";
import "../../ha-frontend/components/ha-checkbox";
import "../../ha-frontend/components/ha-formfield";
import { SwitchManagerConfig } from "../types";

declare global {
    interface HTMLElementTagNameMap {
        "switch-manager-dialog-copy-from": SwitchManagerDialogCopyFrom;
    }
}

@customElement('switch-manager-dialog-copy-from')
class SwitchManagerDialogCopyFrom extends LitElement 
{
    @property({ attribute: false }) public hass!: any;

    @state() private _opened = false;

    @state() private _blueprint_id?: string;

    @state() private _current_switch_id?: string;

    @state() private _valid: boolean = false;

    @state() private _copyVariables: boolean = false;

    @state() private _switches: SwitchManagerConfig[] = [];

    @state() private _selected?: SwitchManagerConfig;

    private _params!: any;

    public showDialog(params: any): void 
    {
        this._params = params;
        this._opened = true;
        this._valid = false;
        this._copyVariables = false;
        this._current_switch_id = params.current_switch_id;
        this._blueprint_id = params.blueprint_id;
        this._selected = undefined;
        this._populateValidSwitches();
    }

    public closeDialog(): void 
    {
        this._params.onClose();
    
        if (this._opened) {
            fireEvent(this, "dialog-closed", { dialog: this.localName });
        }
        this._opened = false;
    }

    static get styles(): CSSResultGroup {
        return [
          haStyle,
          haStyleDialog,
          css`
            ha-textfield,
            ha-textarea {
              display: block;
            }
            ha-alert {
              display: block;
              margin-bottom: 16px;
            }
          `,
        ];
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
                .heading="${createCloseHeading(this.hass, 'Copy From')}">

                <div class="info">Use this tool to copy the sequences and variables from another switch</div>

                <ha-selector-select
                    id="switch-selector"
                    .hass=${this.hass}
                    label="${this._switches.length ? 'Switch' : 'No Valid Switches!'}"
                    .selector=${this._buildSelector()}
                    .disabled=${!this._switches.length}
                    @value-changed=${this._switchValueChanged}>
                </ha-selector-select>

                <ha-formfield
                    .label="${'Include Variables'}">
                    <ha-checkbox
                        .checked=${this._copyVariables}
                        .disabled=${!this._switches.length}
                        @change=${() => this._copyVariables = !this._copyVariables}></ha-checkbox>
                </ha-formfield>

                <div class="warning">This will remove all sequences currently assigned to this switch</div>

                <mwc-button @click=${this.closeDialog} slot="secondaryAction">
                    Cancel
                </mwc-button>
                <mwc-button @click=${this._save} slot="primaryAction" .disabled=${!this._valid}>
                    Copy
                </mwc-button>
            </ha-dialog>`
    }

    protected _populateValidSwitches()
    {
        let params = {
            type: buildWSPath('copy_from_list'), 
            blueprint_id: this._blueprint_id
        }
        if( this._current_switch_id )
            params['skip_config_id'] = this._current_switch_id;

        this.hass.callWS(params).then( r => {
            this._switches = r.switches;
            this.requestUpdate();
        });
    }

    protected _buildSelector()
    {
        return {    
            select: {
                mode: "dropdown",
                options: this._switches.map((s) => {
                    return {
                        label: s.name,
                        value: s.id,
                    };
                })
            }
        };
    }

    protected _switchValueChanged(e: CustomEvent)
    {
        this._switches.forEach((s) => {
            if( s.id == e.detail.value )
                this._selected = s;
        });
        this._valid = true;
    }

    protected _save()
    {
        this._params.update({
            buttons: this._selected!.buttons,
            variables: (this._copyVariables) ? this._selected!.variables : false
        });
        this.closeDialog();
    }
}