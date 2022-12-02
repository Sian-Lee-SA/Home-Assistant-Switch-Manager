import { html, css, LitElement } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { SwitchManagerBlueprint } from "../types";
import {
    mdiGestureTapButton,
    mdiClose
} from "@mdi/js";
import { 
    buildAssetUrl, 
    buildUrl,
    buildWSPath,
    navigate, 
    showToast
} from "../helpers";
import { fireEvent } from "@hass/common/dom/fire_event";


@customElement('switch-manager-dialog-blueprint-selector')
class SwitchManagerBlueprintSelector extends LitElement 
{
    @property({attribute: false}) public hass!: any;
    @property({attribute: false}) blueprints: {[key: string]: SwitchManagerBlueprint};

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
                .heading=${html`<div class="header_title">Select Blueprint</div>`}>

                <mwc-list>
                    ${this._listBlueprints()}
                </mwc-list>
                <!-- <div id="content">
                    <ha-icon-button id="close-button" .path=${mdiClose}></ha-icon-button>               
                </div> -->
                </ha-dialog>
        `;
    }


    static get styles() 
    {
        return css`
        :host {
            --mdc-dialog-min-width: 500px;
        }

        mwc-list-item {
            height: 90px;
            padding: 0px 20px;
            align-items: center;
        }

        h2 {
            padding: 0px 0px 12px;
            margin: 0px;
            font-weight: normal;
            font-size: 1.3em;
            border-bottom: 1px solid #DDD;
            margin-bottom: 5px;
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
        `;
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
        this.hass.callWS({type: buildWSPath('blueprints')}).then( promise => {
            this.blueprints = promise.blueprints;            
        }).catch(error => showToast(this, { message: error.message }));
    }

    private _listBlueprints(): any[]
    {
        if( !this.blueprints )
            return;
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
            _html.push(html`<h2>${k}</h2>`);
            
            for( let i of ordered[k] )
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
        }
        return _html;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "switch-manager-dialog-blueprint-selector": SwitchManagerBlueprintSelector;
    }
}