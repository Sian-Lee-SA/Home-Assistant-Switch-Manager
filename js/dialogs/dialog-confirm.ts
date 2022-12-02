import { mdiAlertOutline } from "@mdi/js";
import { css, CSSResultGroup, html, LitElement, TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { ConfirmationDialogParams } from "../helpers";
import { fireEvent } from "@hass/common/dom/fire_event";

@customElement("switch-manager-dialog-confirm")
class SwitchManagerDialogConfirm extends LitElement 
{
    @property({ attribute: false }) public hass!: any;

    @state() private _params?: ConfirmationDialogParams;

    public async showDialog(params: ConfirmationDialogParams): Promise<void> 
    {
        this._params = params;
    }

    public closeDialog(): boolean 
    {
        if (this._params?.confirmation || this._params?.prompt) {
            return false;
        }
        if (this._params) {
            this._dismiss();
            return true;
        }
        return true;
    }

    protected render(): TemplateResult 
    {
        if (!this._params) {
            return html``;
        }

        const confirmPrompt = this._params.confirmation || this._params.prompt;

        return html`
            <ha-dialog
                open
                ?scrimClickAction=${confirmPrompt}
                ?escapeKeyAction=${confirmPrompt}
                @closed=${this._dialogClosed}
                defaultAction="ignore"
                .heading=${html`${this._params.warning
                ? html`<ha-svg-icon
                    .path=${mdiAlertOutline}
                    style="color: var(--warning-color)"
                    ></ha-svg-icon> `
                : ""}${this._params.title
                ? this._params.title
                : this._params.confirmation &&
                    this.hass.localize(
                    "ui.dialogs.generic.default_confirmation_title"
                    )}`}>
                
                <div>
                    ${this._params.text ? html`
                    <p class=${this._params.prompt ? "no-bottom-padding" : ""}>
                        ${this._params.text}
                    </p>` : ""}
                </div>
                ${confirmPrompt &&
                html`
                <mwc-button @click=${this._dismiss} slot="secondaryAction">
                    ${this._params.dismissText
                    ? this._params.dismissText
                    : this.hass.localize("ui.dialogs.generic.cancel")}
                </mwc-button>
                `}
                <mwc-button
                    @click=${this._confirm}
                    ?dialogInitialFocus=${!this._params.prompt}
                    slot="primaryAction"
                    class=${classMap({
                        destructive: this._params.destructive || false,
                    })}>
                    ${this._params.confirmText
                        ? this._params.confirmText
                        : this.hass.localize("ui.dialogs.generic.ok")}
                </mwc-button>
            </ha-dialog>
        `;
    }

    private _dismiss(): void 
    {
        if (this._params?.cancel) {
            this._params.cancel();
        }
        this._close();
    }

    private _confirm(): void 
    {
        if (this._params!.confirm) {
            this._params!.confirm();
        }
        this._close();
    }

    private _dialogClosed(ev) 
    {
        if (ev.detail.action === "ignore") {
            return;
        }
        this._dismiss();
    }

    private _close(): void 
    {
        if (!this._params) {
            return;
        }
        this._params = undefined;
        fireEvent(this, "dialog-closed", { dialog: this.localName });
    }

    static get styles(): CSSResultGroup 
    {
        return css`
            :host([inert]) {
                pointer-events: initial !important;
                cursor: initial !important;
            }
            a {
                color: var(--primary-color);
            }
            p {
                margin: 0;
                color: var(--primary-text-color);
            }
            .no-bottom-padding {
                padding-bottom: 0;
            }
            .secondary {
                color: var(--secondary-text-color);
            }
            .destructive {
                --mdc-theme-primary: var(--error-color);
            }
            ha-dialog {
                --mdc-dialog-heading-ink-color: var(--primary-text-color);
                --mdc-dialog-content-ink-color: var(--primary-text-color);
                /* Place above other dialogs */
                --dialog-z-index: 104;
            }
            @media all and (min-width: 600px) {
                ha-dialog {
                --mdc-dialog-min-width: 400px;
                }
            }
            ha-textfield {
                width: 100%;
            }
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "switch-manager-dialog-confirm": SwitchManagerDialogConfirm;
    }
}