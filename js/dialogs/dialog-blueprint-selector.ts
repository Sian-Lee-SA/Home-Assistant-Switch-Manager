import { html, css, LitElement } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { SwitchManagerBlueprint } from "../types";
import {
    mdiGestureTapButton,
    mdiHelpCircle
} from "@mdi/js";
import { 
    buildAssetUrl, 
    buildUrl,
    buildWSPath
} from "../helpers";
import { showToast } from "../../ha-frontend/util/toast";
import { createCloseHeading } from "../../ha-frontend/components/ha-dialog";
import { fireEvent } from "../../ha-frontend/common/dom/fire_event";
import { haStyleDialog, haStyleScrollbar } from "../../ha-frontend/resources/styles";
import { navigate } from "../../ha-frontend/common/navigate";
import "../../ha-frontend/components/ha-dialog";
import "../../ha-frontend/components/ha-expansion-panel";
import "@material/mwc-list/mwc-list";
import "@material/mwc-list/mwc-list-item";

declare global {
    interface HTMLElementTagNameMap {
        "switch-manager-dialog-blueprint-selector": SwitchManagerBlueprintSelector;
    }
}

@customElement('switch-manager-dialog-blueprint-selector')
class SwitchManagerBlueprintSelector extends LitElement 
{
    @property({attribute: false}) public hass!: any;

    @property({attribute: false}) blueprints?: {[key: string]: SwitchManagerBlueprint};

    @state() private _opened = false;

    public showDialog(): void 
    {
        this._opened = true;        
    }
  
    public closeDialog(): void 
    {
        if (this._opened) {
            fireEvent(this, "dialog-closed", { dialog: this.localName });
        }
        this._opened = false;
    }

    render()
    {
        if (!this._opened) {
            return html``;
        }
        return html`
            <ha-dialog        
                open
                hideActions
                @closed=${this.closeDialog}
                .heading=${createCloseHeading(this.hass, html`Select Blueprint
                <p style="margin: 0;margin-bottom: -16px;font-size: 12px;">Can't find a blueprint for your switch? create your own.
                    <ha-icon-button style="vertical-align: middle;" .path=${mdiHelpCircle} @click=${() => window.open('https://github.com/Sian-Lee-SA/Home-Assistant-Switch-Manager#blueprints', '_blank')!.focus()}></ha-icon-button>
                </p>`)}>
                <mwc-list>
                    ${this._listBlueprints()}
                </mwc-list>
            </ha-dialog>
        `;
    }


    static get styles() 
    {
        return [haStyleDialog, haStyleScrollbar, css`

            mwc-list-item {
                min-width: 470px;
                height: 90px;
                padding: 0px 20px;
                align-items: center;
            }
            h2 {
                min-width: 475px;
                margin: 15px 0px 0px;
                font-weight: normal;
                font-size: 1.3em;
            }
            h2:first-child {
                margin: 0;
            }
            ha-icon-button {
                vertical-align: middle;
            }
            .row {
                display: flex;
                align-items: center;
            }
            a.blueprint-item {
                display: flex;
                padding: 0px 20px;
                align-items: center;
                -webkit-font-smoothing: antialiased;
                font-family: var(--mdc-typography-subtitle1-font-family, var(--mdc-typography-font-family, Roboto, sans-serif));
                font-size: var(--mdc-typography-subtitle1-font-size, 1rem);
                font-weight: var(--mdc-typography-subtitle1-font-weight, 400);
                letter-spacing: var(--mdc-typography-subtitle1-letter-spacing, 0.009375em);
                color: var(--mdc-theme-text-primary-on-background, rgba(0, 0, 0, 0.87));
                text-decoration: none;
            }
            .image {
                height: 90px;
                width: 90px;
                text-align: center;
                padding: 4px;
                box-sizing: border-box;
                display: flex;
                justify-content: center;
                align-items: center;
            }
            .image img {
                max-width: 100%;
                max-height: 100%;
            }
            .image ha-svg-icon {
                fill: var(--primary-color);
                margin-top: 5px;
                width: 85%;
                height: 85%;
            }
            .name {
                padding-left: 1em;
            }
        `];
    }


    private _itemClicked(id: string)
    {
        navigate( buildUrl(`new/${id}`) );
        this.closeDialog();
    }

    connectedCallback(): void {
        super.connectedCallback();
        this._updateBlueprints();
    }

    private _updateBlueprints()
    {
        this.hass.callWS({type: buildWSPath('blueprints')}).then( r => {
            this.blueprints = r.blueprints;            
        }).catch(error => showToast(this, { message: error.message }));
    }

    private _listBlueprints(): any[]
    {
        if( !this.blueprints )
            return [];

        let ordered = {}
        for( let b of Object.values(this.blueprints) )
        {
            if( ! ordered[b.service] )
                ordered[b.service] = [];
            ordered[b.service].push(b)
        }
        let _html: any[] = []
        for( let k in ordered )
        {
            _html.push( html`<ha-expansion-panel><h2 slot="header">${k}</h2>${this._switchItem(ordered[k])}</ha-expansion-panel>` )
        }
        return _html;
    }

    private _switchItem( items )
    {
        let _html: any[] = []
        for( let i of items )
        {
            _html.push(html`
            <mwc-list-item @click=${() => this._itemClicked(i.id)} data-item-id="${i.id}">
                    <div class="row">
                        <div class="image">
                            ${i.has_image ? 
                                html`<img src="${buildAssetUrl(`${i.id}.png`)}" />` : 
                                html`<ha-svg-icon style="fill: var(--primary-color);" .path=${mdiGestureTapButton}></ha-svg-icon>`}
                        </div>
                        <div class="name">${i.name}</div>
                    </div>
            </mwc-list-item>`);
        }
        return _html;
    }
}