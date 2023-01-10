import { css, CSSResultGroup, html, LitElement, TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { createCloseHeading } from "../../ha-frontend/components/ha-dialog";
import { haStyle, haStyleDialog } from "../../ha-frontend/resources/styles"
import { fireEvent } from "../../ha-frontend/common/dom/fire_event";
import "@material/mwc-button";
import "../../ha-frontend/components/ha-yaml-editor";

declare global {
    interface HTMLElementTagNameMap {
        "switch-manager-dialog-variables-editor": SwitchManagerDialogVariablesEditor
    }
}

@customElement('switch-manager-dialog-variables-editor')
class SwitchManagerDialogVariablesEditor extends LitElement 
{
    @property({ attribute: false }) public hass!: any;

    @state() private _opened = false;

    @state() private _variables: any;

    @state() private _valid: boolean = true;

    @state() private _dirty: boolean = false;

    private _params!: any;

    public showDialog(params: any): void 
    {
        this._params = params;
        this._variables = params.config.variables;
        this._opened = true;
        this._valid = true;
        this._dirty = false;
    }

    public closeDialog(): void 
    {
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
                .heading="${createCloseHeading(this.hass, 'Variables')}">

                <div id="info">Use the yaml editor below to define your variables for this switch. The variables can be access through the blueprint conditions
                or action sequences</div>

                <ha-yaml-editor
                    .hass=${this.hass}
                    .defaultValue=${this._variables}
                    .readOnly=${false}
                    ?invalid=${!this._valid}
                    @value-changed=${this._yamlChanged}>
                </ha-yaml-editor>
                
                <mwc-button @click=${this.closeDialog} slot="secondaryAction">
                    Cancel
                </mwc-button>
                <mwc-button @click=${this._save} slot="primaryAction" .disabled=${!this._valid || !this._dirty}>
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
            ha-dialog {
                --mdc-dialog-min-width: 90vw;
                --mdc-dialog-max-width: 90vw;
            }
            @media screen and ( min-width: 1150px )
            {
                ha-dialog {
                    --mdc-dialog-min-width: 1010px;
                    --mdc-dialog-max-width: 1010px;
                }
            }
            #info {
                margin-bottom: 1em;
            }
            ha-yaml-editor[invalid] {
                border: 1px solid red;
                display: block;
            }
            `,
        ];
    }

    private _yamlChanged(ev: CustomEvent)
    {
        ev.stopPropagation();
        this._valid = ev.detail.isValid;
        if ( ! ev.detail.isValid ) {
          return;
        }
        this._variables = ev.detail.value;
        this._dirty = true;
    }

    private _save()
    {
        this._params.update({
            ...this._params.config,
            variables: this._variables
        });
        this._dirty = false;
        this.closeDialog();
    }
}