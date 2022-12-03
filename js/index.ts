import { html, css, LitElement } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { SwitchManagerBlueprint, SwitchManagerConfig } from "./types";
import memoizeOne from "memoize-one";
import {
    mdiPlus,
    mdiDelete,
    mdiPlayCircleOutline,
    mdiStopCircleOutline,
    mdiGestureTapButton
} from "@mdi/js";
import { 
    buildAssetUrl, 
    buildUrl, 
    buildWSPath, 
    computeRTLDirection,
    showToast, 
    navigate, 
    showConfirmDialog
} from "./helpers";
import { fireEvent } from "@hass/common/dom/fire_event";
import { haStyle, haStyleScrollbar } from "@hass/resources/styles";
import { fabStyle } from "./styles";


@customElement('switch-manager-index')
class SwitchManagerIndex extends LitElement 
{
    @property() hass!: any;
    @property() narrow;
    @property() panel;
    @property() route;
    @state() private _data: any[] = [];

    private _columns = memoizeOne(
        () => ({
            image: {
                title: "",
                sortable: false,
                filterable: false,
                grows: false,
                width: '90px', 
                template: (blueprint_id, data: any) => {
                    if( ! data.switch.valid_blueprint )
                        return '';
                    if( ! data.switch.blueprint.has_image )
                        return html`<ha-svg-icon style="fill: var(--primary-color); margin: 0 auto;display:block;height: 85%;
                        width: 85%;" .path=${mdiGestureTapButton}></ha-svg-icon>`
                    return html`<img style="max-width: 100%;max-height: 48px;display: block;margin:0 auto;" src="${buildAssetUrl(`${blueprint_id}.png`)}" />`;
                }                
            },
            name: {
                title: 'Name',
                main: true,
                direction: "asc",
                sortable: true,
                filterable: true,
                grows: true,
                template: (name, data: any) => data.error ? 
                    html`<span style="color: red;">${name} (${data.error})</span>`
                    : name
            },
            enabled: {
                title: "",
                width: "10%",
                template: (enabled: boolean) => !enabled ? html`
                        <ha-chip>
                            Disabled
                        </ha-chip>` : '',
            },
            service: {
                title: 'Service',
                sortable: true,
                filterable: true,
                width: '15%'
            },
            type: {
                title: 'Type',
                sortable: true,
                filterable: true,
                grows: false,
                width: '15%'
            },
            actions: {
                title: "",
                width: this.narrow ? undefined : "10%",
                type: "overflow-menu",
                template: (id: string, data: any) =>
                    html`
                        <ha-icon-overflow-menu
                        .hass=${this.hass}
                        narrow
                        .items=${[
                            {
                                path: !data.enabled ? mdiPlayCircleOutline : mdiStopCircleOutline,
                                label: !data.enabled ? 'Enable' : 'Disable',
                                disabled: (data.error),
                                action: () => this._toggleEnabled(data.switch_id, data.enabled),
                            },
                            {
                                label: "Delete",
                                  path: mdiDelete,
                                  action: () => this._deleteConfirm(data),
                                  warning: true,
                            }
                        ]}>
                        </ha-icon-overflow-menu>`
            }
        })
    )

    render() 
    {
        return html`
            <ha-app-layout>
                <app-header slot="header" fixed>
                    <app-toolbar>
                        <ha-menu-button
                            .hass=${this.hass}
                            .narrow=${this.narrow}
                            ></ha-menu-button>
                        <div main-title>Switch Manager</div>
                    </app-toolbar>
                </app-header>      
            </ha-app-layout>
            <hui-view>
                <hui-panel-view>
                    <ha-data-table
                        .columns=${this._columns()}
                        .data=${this._data}
                        noDataText="No Switches"
                        id="switch_id"
                        index="index"
                        clickable
                        @row-click=${this._rowClicked}
                        .dir=${computeRTLDirection(this.hass)}>

                    </ha-data-table>

                    <div class="fab-container">
                        <ha-fab
                            slot="fab"
                            .label=${'Add Switch'}
                            extended
                            @click=${this._showBlueprintDialog}>
                            <ha-svg-icon slot="icon" .path=${mdiPlus}></ha-svg-icon>
                        </ha-fab>
                    </div>
                </hui-panel-view>
            </hui-view>
        `;        
    }

    static get styles() 
    {
        return [
            haStyle, 
            haStyleScrollbar, 
            fabStyle,
            css`
            ha-data-table {
            }
            hui-view {
                display: block;
                height: calc(100vh - var(--header-height));
                overflow-y: auto;
            }
        `];
    }

    connectedCallback(): void 
    {        
        super.connectedCallback();
        this._populateSwitches();        
    }

    private _populateSwitches()
    {
        const __data = [];
        this.hass.callWS({type: buildWSPath('configs')}).then( promise => {
            Object.values(promise.configs).forEach( (_switch: SwitchManagerConfig) => {
                let blueprint;
                if( _switch.valid_blueprint )
                    blueprint = <SwitchManagerBlueprint>_switch.blueprint;
                else
                    blueprint = { id: _switch.blueprint }
                __data.push({
                    switch: _switch,
                    image: blueprint.id,
                    switch_id: _switch.id,
                    error: (<any>_switch)._error,
                    enabled: _switch.enabled,
                    name: _switch.name,
                    service: blueprint.service,
                    type: blueprint.name,
                    actions: _switch.id
                });
            });
            this._data = __data;         
        })
    }

    private _rowClicked( e )
    {          
        navigate( buildUrl(`edit/${e.detail.id}`) )
    }

    private async _toggleEnabled( id: string, enabled: boolean )
    {        
        this.hass.callWS({ type: buildWSPath('config/enabled'), enabled: !enabled, config_id: id }).then( r => {
            this._populateSwitches();
            showToast(this, { 
                message: `Switch ${r.enabled ? 'Enabled':'Disabled'}` 
            });
            
        }).catch(error => showToast(this, { message: error.message }))
    }
    
    private async _deleteConfirm( _switch )
    {
        showConfirmDialog(this, {
            title: 'Delete switch?',
            text: `${_switch.name} will be permanently deleted.`,
            confirmText: 'Delete',
            dismissText: 'Cancel',
            confirm: () => this._delete(_switch.switch_id),
            confirmation: true,
            destructive: true,
        });
    }

    private async _delete( id: string )
    {
        this.hass.callWS({type: buildWSPath('config/delete'), config_id: id.toString()}).then( promise => {
            this._populateSwitches();
            showToast(this, {
                message: 'Switch Deleted'
            });
        }).catch(error => showToast(this, { message: error.message }));
    }

    private _showBlueprintDialog()
    {
        fireEvent(this, 'show-dialog', {
            dialogTag: "switch-manager-dialog-blueprint-selector",
            dialogImport: () => import('./dialogs/dialog-blueprint-selector'),
            dialogParams: {},
        });
    }
}