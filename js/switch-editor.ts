import { html, css, LitElement } from "lit";
import { customElement, property, state, query } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import {
    mdiContentSave,
    mdiArrowLeft,
    mdiRenameBox,
    mdiDotsVertical,
    mdiDelete,
    mdiStopCircleOutline,
    mdiPlayCircleOutline,
    mdiGestureTapButton,
    mdiEarHearing
} from "@mdi/js";
import { SwitchManagerBlueprint, SwitchManagerBlueprintCondition, SwitchManagerConfig, SwitchManagerConfigButton } from "./types";
import { MODES } from "../ha-frontend/data/script";
import { 
    buildAssetUrl, 
    buildUrl, 
    buildWSPath, 
    createConfigFromBlueprint,
    getValueById,
    showConfirmDialog
} from "./helpers";
import { navigate } from "../ha-frontend/common/navigate";
import { fireEvent } from "../ha-frontend/common/dom/fire_event";
import { showToast } from "../ha-frontend/util/toast";
import { fabStyle } from "./styles";
import { haStyle } from "../ha-frontend/resources/styles";
import "@polymer/app-layout/app-header/app-header";
import "@polymer/app-layout/app-toolbar/app-toolbar";
import "./button-actions";
import "../ha-frontend/types";
import "../ha-frontend/panels/config/automation/action/ha-automation-action";
import "../ha-frontend/components/ha-fab";
import "../ha-frontend/components/ha-card";
import "../ha-frontend/components/ha-button-menu";
import "../ha-frontend/components/ha-chip";

declare global {
    interface HTMLElementTagNameMap {
      "switch-manager-switch-editor": SwitchManagerSwitchEditor;
    }
}

@customElement("switch-manager-switch-editor")
class SwitchManagerSwitchEditor extends LitElement
{
    @property() hass!: any;
    @property() narrow;
    @property() panel;
    @property() route;
    @property() params;

    @property() blueprint: SwitchManagerBlueprint|undefined;
    @property() config: SwitchManagerConfig|undefined;

    @property() disabled = false;

    @state() private _subscribed?: () => void;

    @state() private sequence: any[] = [];
    @state() private button_index: number = 0;
    @state() private action_index: number = 0;

    @state() private is_new: boolean = true;

    @state() private _dirty: boolean = false;
    @state() private _block_save: boolean = false;
    @state() private _errors?: string;

    @query('#switch-svg') svg;
    @query('#identifier-input') identifier_input;

    render() 
    {
        if( ! this.config )
            return html``;

        return html`
            <ha-app-layout>
                <app-header slot="header" fixed>
                    <app-toolbar>
                        <ha-menu-button
                            .hass=${this.hass}
                            .narrow=${this.narrow}>
                        </ha-menu-button>
                        <ha-icon-button
                            .path=${mdiArrowLeft}
                            @click=${() => navigate(buildUrl())}>
                        </ha-icon-button>
                        <div main-title id="title-container">
                            <span>Switch Manager - ${this.config?.name}</span>
                        </div>
                        <div>
                            <ha-button-menu corner="BOTTOM_START" slot="toolbar-icon">
                                <ha-icon-button
                                    slot="trigger"
                                    .label=${this.hass.localize("ui.common.menu")}
                                    .path=${mdiDotsVertical}>
                                </ha-icon-button>
                                
                                <mwc-list-item
                                    graphic="icon"
                                    @click=${this._showRenameDialog}>
                                        Rename
                                        <ha-svg-icon slot="graphic" .path=${mdiRenameBox}>
                                        </ha-svg-icon>
                                </mwc-list-item>
                                
                                <mwc-list-item
                                    graphic="icon"
                                    .disabled=${!this.config || this.is_new || !this.config?.valid_blueprint}
                                    @click=${this._toggleEnabled}>
                                        ${!this.config?.enabled ? 'Enable' : 'Disable'}
                                        <ha-svg-icon
                                            slot="graphic"
                                            .path=${!this.config?.enabled ? mdiPlayCircleOutline : mdiStopCircleOutline}>
                                        </ha-svg-icon>
                                </mwc-list-item>
                                
                                <li divider role="separator"></li>

                                <mwc-list-item
                                    .disabled=${this.is_new}
                                    class=${classMap({ warning: Boolean(!this.is_new) })}
                                    graphic="icon"
                                    @click=${this._deleteConfirm}>
                                        Delete
                                        <ha-svg-icon
                                            class=${classMap({ warning: Boolean(!this.is_new) })}
                                            slot="graphic"
                                            .path=${mdiDelete}>
                                        </ha-svg-icon>
                                </mwc-list-item>
                            </ha-button-menu>
                        </div>
                    </app-toolbar> 
                </app-header>
            </ha-app-layout>
            <hui-view>
                <hui-panel-view>
                    ${this.config?.valid_blueprint ? html`
                    <h3 id="blueprint-name">${this.blueprint?.service} / ${this.blueprint?.name}</h3>
                    <span id="identifier">
                        <ha-textfield 
                            id="identifier-input" 
                            type="text" 
                            .value="${this.config?.identifier}" 
                            required="true" 
                            .label=${this.blueprint?.event_type == 'mqtt'? 'mqtt topic' : this.blueprint?.identifier_key}
                            @input="${this._identifierChanged}"></ha-textfield>
                        ${this.blueprint?.event_type != 'mqtt' || this.blueprint?.mqtt_topic_format ? html`
                        <ha-icon-button
                            .path=${mdiEarHearing}
                            ?listening=${(this._subscribed)}
                            @click=${this._listenForEvent}>
                        </ha-icon-button>` : 
                            html`${this.blueprint.mqtt_topic_format ? html`<ha-alert alert-type="info">Format: ${this.blueprint.mqtt_topic_format}</ha-alert>` : ''}`}
                        ${this._subscribed ? html`
                        <ha-alert alert-type="info">
                            Press a button on your switch
                        </ha-alert>` : ''}
                    </span>`:''}
                    
                
                    <div id="switch-image">
                    ${this.blueprint && !this.blueprint?.has_image ?
                        html`<ha-svg-icon .path=${mdiGestureTapButton}></ha-svg-icon>` :
                        html`<svg id="switch-svg"></svg>`}
                    </div>

                    ${this.config?.valid_blueprint ? html`
                    <switch-manager-button-actions
                        .hass=${this.hass}
                        .blueprint_actions=${this.blueprint?.buttons[this.button_index]?.actions}
                        .config_actions=${this.config.buttons[this.button_index].actions}
                        .index=${this.action_index}
                        @changed=${this._actionChanged}>
                    </switch-manager-button-actions>`: ''}
                    
                    <ha-card outlined>
                        <div class="card-content">

                            ${this._errors ? html`
                            <ha-alert alert-type="error">
                                ${this._errors}
                            </ha-alert>` : ''}
                            ${this.config && !this.config.enabled ? html`
                            <ha-alert alert-type="info">
                                Switch is disabled
                                <mwc-button slot="action" @click=${this._toggleEnabled}>
                                    Enable
                                </mwc-button>
                            </ha-alert>` : ''}
                            ${this.config?.valid_blueprint ? html`
                            <div id="sequence-container">
                                <div class="header">
                                    <h2 id="sequence-heading" class="name">
                                        Sequence                                
                                        <ha-selector-select
                                            id="mode-selector"
                                            .hass=${this.hass}
                                            .value=${this.config?.buttons[this.button_index]?.actions[this.action_index].mode}
                                            label="Mode"
                                            .selector=${{       
                                                select: {
                                                    mode: "dropdown",
                                                    options: MODES.map((mode) => ({
                                                        label: mode.charAt(0).toUpperCase() + mode.slice(1),
                                                        value: mode,
                                                    })),
                                                }}
                                            }
                                            @value-changed=${this._modeValueChanged}>
                                        </ha-selector-select>
                                    </h2>
                                </div>
                        
                                <ha-automation-action
                                    role="region"
                                    aria-labelledby="sequence-heading"
                                    .actions=${this.sequence}
                                    @value-changed=${this._configSequenceChanged}
                                    .hass=${this.hass}
                                    .narrow=${this.narrow}
                                    .disabled=${this.disabled}>
                                </ha-automation-action>

                            </div>`:''}
                        </div>
                    </ha-card>
                    ${this.config?.valid_blueprint ? html`
                    <div class="fab-container">
                        <ha-fab
                            slot="fab"
                            .label=${'Save'}
                            extended
                            collapse
                            @click=${this._save}
                            class=${classMap({
                                dirty: this._dirty,
                                blocked: this._block_save
                            })}>
                            <ha-svg-icon slot="icon" .path=${mdiContentSave}></ha-svg-icon>
                        </ha-fab>
                    </div>`:''}
                </hui-panel-view>
            </hui-view>            
          `;
    }

    static get styles() {
        return [
            haStyle,
            fabStyle,
            css`
            @keyframes pulse {
                from {
                    opacity: 1;
                }
                to {
                    opacity: 0.4;
                }
            }
            ha-card {
                margin: 0 auto;
                max-width: 1040px;
                --mdc-select-fill-color: transparent;
            }
            h3, #identifier {
                padding-left: 25px;
            }
            #identifier {
                position: relative;
            }
            #identifier-input {
                width: 300px;
                --text-field-padding: 0 36px 0 12px;
            }
            #identifier ha-icon-button {
                vertical-align: middle;
                background: var(--mdc-text-field-fill-color);
                border-radius: 50%;
                color: var(--mdc-text-field-ink-color);
                margn-top: -10px;
                margin-top: -14px;
                margin-left: -34px;
                position: relative;
                --mdc-icon-button-size: 54px;
                box-shadow: -5px 1px 8px -6px;
            }
            #identifier ha-icon-button[listening] {
                animation: 1s infinite alternate pulse;
            }
            #identifier ha-alert {
                display: block;
                width: 300px;
                position: absolute;
                margin-left: 25px;
            }
            @media screen and ( max-width: 690px )
            {
                #identifier-input, #identifier ha-alert {
                    width: 90%;
                    position: relative;
                }
            }
            hui-view {
                height: calc(100vh - var(--header-height));
                display: block;
                overflow-y: auto;
                padding-bottom: 3em;
                box-sizing: border-box;
            }
            .header {
                display: flex;
                align-items: center;
            }
            .header:first-child {
                margin-top: -16px;
            }
            .header .name {
                font-size: 20px;
                font-weight: 400;
                flex: 1;
                margin-top: 0;
            }

            #switch-image {
                max-height: 380px;
                display: flex;
                margin: 1em;
                justify-content: center;
            }           
            @media screen and ( min-width: 1500px )
            {
                #switch-image {
                    margin-top: -65px;
                }
            }
            #sequence-container {
                padding: 28px 20px 0;
            }
            #mode-selector {
                display: inline-block;
                margin-left: 20px;
            }
            #switch-image > svg {
                /* for strokes on edge */
                overflow: visible;
            }
            #switch-image ha-svg-icon {
                fill: var(--primary-color);
                width: 260px;
                height: 260px;
            }
            #switch-image svg image {
                filter: drop-shadow(0px 0px 8px #00000033);
            }
            #switch-image svg .button {
                fill: #00000000;
                stroke: #00adff3d;
                stroke-width: 3;
                cursor: pointer;
            }
            #switch-image svg .button[empty] {
                fill: #cfcfcf66;
            }
            #switch-image svg .button[selected] {
                fill: #6bd3ff75;
                stroke: #0082e9;
            }
            .errors {
                padding: 20px;
                font-weight: bold;
                color: var(--error-color);
            }
            `];
    }

    connectedCallback(): void 
    {
        super.connectedCallback();
        this._loadConfig();        
    }

    disconnectedCallback(): void 
    {
        super.disconnectedCallback();
        if( this._subscribed )
        {
            this._subscribed();
            this._subscribed = undefined;
        }
    }

    private _loadConfig()
    {
        if( 'id' in this.params ) {
            this.is_new = false;
            this.hass.callWS({type: buildWSPath('configs'), config_id: this.params.id}).then( r => {
                this._setConfig(r.config);
            });
        } else {
            this.is_new = true;
            this._dirty = true;
            if( 'blueprint' in this.params )
                this._loadBlueprint(this.params.blueprint).then( r => {
                    this._setConfig( createConfigFromBlueprint(r.blueprint) );
                    this._showRenameDialog();
                });
        }  
    }

    private _loadBlueprint(id: string)
    {
        return this.hass.callWS({type: buildWSPath('blueprints'), blueprint_id: id});
    }

    private _setConfig( config: SwitchManagerConfig )
    {
        this.config = config;
        if( (<any>config)._error )
        {
            this._errors = (<any>config)._error;
            this._block_save = true;
            return;
        }
        this._setBlueprint( config.blueprint )
        this._updateSequence();
    }

    private _setBlueprint( blueprint: SwitchManagerBlueprint )
    {
        this.blueprint = blueprint;
        this.requestUpdate();
        this._drawSVG();
    }

    private async _drawSVG()
    {
        if( !this.blueprint?.has_image )
            return;
        
        // Ensure SVG is in DOM
        await this.updateComplete;
        var img = new Image;
        img.src = buildAssetUrl(`${this.blueprint.id}.png`);
        img.onload = () => {      
            // Add headroom for button strokes      
            this.svg.setAttributeNS(null, 'viewBox', `0 0 ${(img.width).toString()} ${(img.height).toString()}`)
            var svgimg = document.createElementNS('http://www.w3.org/2000/svg', 'image');
            svgimg.setAttributeNS(null, 'x', '0');
            svgimg.setAttributeNS(null, 'y', '0');
            svgimg.setAttributeNS(null, 'width', img.width.toString());
            svgimg.setAttributeNS(null, 'height', img.height.toString());
            svgimg.setAttributeNS('http://www.w3.org/1999/xlink', 'href', img.src);
            svgimg.setAttributeNS(null, 'visibility', 'visible');
            this.svg.prepend(svgimg);
        };

        // No need to render buttons or selection on buttons if there is only 1 button
        if( this.blueprint.buttons.length > 1 )
        {
            this.blueprint.buttons.forEach((button, index) => {
                let svgshape: SVGCircleElement | SVGRectElement | SVGPathElement;
                if( button.shape == 'circle' ) {
                    svgshape = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
                    svgshape.setAttributeNS(null, 'cx', button.x.toString());
                    svgshape.setAttributeNS(null, 'cy', button.y.toString());
                    svgshape.setAttributeNS(null, 'r', button.width.toString());
                } else if ( button.shape == 'path' ) { 
                    svgshape = document.createElementNS('http://www.w3.org/2000/svg', 'path');
                    svgshape.setAttributeNS(null, 'd', button.d.toString());
                } else {
                    svgshape = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
                    svgshape.setAttributeNS(null, 'x', button.x.toString());
                    svgshape.setAttributeNS(null, 'y', button.y.toString());
                    svgshape.setAttributeNS(null, 'width', button.width.toString());
                    svgshape.setAttributeNS(null, 'height', button.height.toString());
                }
                svgshape.setAttribute('class', 'button');
                svgshape.setAttribute('index', index.toString());
                if( this.button_index == index ) {
                    svgshape.setAttribute('selected', '');
                }
                if( ! this._buttonTotalSequence( this.config!.buttons[index] ) )
                {
                    svgshape.setAttribute('empty', '');
                }
                svgshape.addEventListener('click', ev => {
                    ev.preventDefault();
                    ev.stopPropagation();
                    this._setButtonIndex(parseInt((<HTMLElement>ev.target).getAttribute('index')!));                
                });
                this.svg.append(svgshape);
            });
        }
    }

    private _buttonTotalSequence( button: SwitchManagerConfigButton )
    {
        let total = 0;
        button.actions.forEach(a => {
            total += a.sequence.length;
        })
        return total;
    }

    private _validate(): boolean
    {
        this._errors = undefined;
        this.identifier_input.invalid = false;
        if( !this.config?.identifier )
        {
            this._errors = 'Identifier must not be empty';
            this.identifier_input.invalid = true;
            this.identifier_input.errorMessage = 'Identifier required';
            return false;
        }
        return true;
    }

    private _save()
    {
        if( this._block_save || !this._validate() || !this.config )
            return;


        this._block_save = true;
        this._dirty = false;

        this.hass.callWS({
            type: buildWSPath('config/save'), 
            config: {...this.config, blueprint: this.config.blueprint.id}
        }).then(r => {            
            if( this.is_new )
            {
                this.is_new = false;
                this.config!.id = r.config_id;
                navigate( buildUrl(`edit/${r.config_id}`) )
            }
            showToast(this, { message: 'Switch Saved' });
        }).catch(error => {
            showToast(this, { message: error.message });
            this._errors = error.message;
            this._dirty = true;            
        }).finally(() => this._block_save = false);
    }

    private _actionChanged(ev: CustomEvent)
    {
        this._setActionIndex(ev.detail.index);
    }

    private _setButtonIndex( index: number )
    {
        if( index == this.button_index )
          return;
        this.button_index = index;
        
        this.svg.querySelector('[selected]').removeAttribute('selected');
        this.svg.querySelector(`[index="${index}"]`).setAttribute('selected', '');

        this._setActionIndex(0);
    }

    private _setActionIndex( index: number )
    {
        this.action_index = index;
        this._updateSequence();
    }

    private _configSequenceChanged(ev: CustomEvent) 
    {        
        this.requestUpdate('config');
        this._updateSequence(ev.detail.value);
        this._errors = undefined;
        this._dirty = true;
    }

    private async _listenForEvent()
    {
        // Act as a toggle
        if( this._subscribed )
        {
            this._subscribed();
            this._subscribed = undefined;
            return;
        }

        const __process_conditions = ( conditions: SwitchManagerBlueprintCondition[], data: any): boolean =>
        {
            if( ! conditions )
                return true;

            for( const condition of conditions )
                if( !(condition.key in data) || String(condition.value) != String(data[condition.key]) )
                    return false;
                    
            return true;
        }

        const __validate_data = ( data: any ): boolean => {
            if( ! __process_conditions( this.blueprint!.conditions!, data ) )
                return false;

            for( const button of this.blueprint!.buttons )
                if( __process_conditions(button.conditions!, data) )
                    for( const action of button.actions )
                        if( __process_conditions(action.conditions!, data) )
                            return true;

            return false;
        }

        const __handle_response = ( id: string, data: any ) => {
            if( !__validate_data(data) )
                return;

            this.identifier_input.value = id;
            this._identifierChanged();
            this._subscribed!();
            this._subscribed = undefined;
        }

        if( this.blueprint!.event_type == 'mqtt' && this.blueprint!.mqtt_topic_format )
            this._subscribed = await   this.hass.connection.subscribeMessage((message) => {
                const data = typeof(message.payload) == 'string' ? { payload: message.payload } : message.payload;
                __handle_response( message.topic, data );
            }, {
                type: "mqtt/subscribe",
                topic: this.blueprint!.mqtt_topic_format,
            });
        else
            this._subscribed = await this.hass!.connection.subscribeEvents( (event) => {
                if( this.blueprint!.identifier_key! in event.data )
                    __handle_response( event.data[this.blueprint!.identifier_key!], event.data );
            }, this.blueprint!.event_type );
    }

    private _identifierChanged(ev?: CustomEvent)
    {
        this.config!.identifier = getValueById(this, 'identifier-input');
        this._dirty = true;
    }

    private _modeValueChanged(ev: CustomEvent)
    {
        if( this.config?.buttons[this.button_index].actions[this.action_index].mode == ev.detail.value )
            return;

        this.config!.buttons[this.button_index].actions[this.action_index].mode = ev.detail.value;
        this.requestUpdate('config');
        this._dirty = true;
    }

    private async _showRenameDialog(): Promise<void>
    {        
        fireEvent(this, "show-dialog", {
            dialogTag: "switch-manager-dialog-rename-switch",
            dialogImport: () => import("./dialogs/dialog-rename-switch"),
            dialogParams: {
                config: this.config,
                update: (config) => {
                    this.config!.name = config.name;
                    this._dirty = true;
                    this.requestUpdate();
                },
                onClose: () => {}
            },
        });
    }

    private _updateSequence(sequence?: any)
    {
        if( sequence )
        {
            this.config!.buttons[this.button_index].actions[this.action_index].sequence = sequence;
        }
        this.sequence = this.config!.buttons[this.button_index].actions[this.action_index].sequence;

        if( ! this._buttonTotalSequence( this.config!.buttons[this.button_index] ) )
        {
            this.svg?.querySelector('[selected]')?.setAttribute('empty', '');
        } else {
            this.svg?.querySelector('[selected]')?.removeAttribute('empty');
        }

        this.requestUpdate('config');
    }

    private _toggleEnabled()
    {
        
        this.hass.callWS({ type: buildWSPath('config/enabled'), enabled: !this.config!.enabled, config_id: this.config!.id }).then( r => {
            this.config!.enabled = r.enabled;
            this.requestUpdate('config');
            showToast(this, { message: `Switch ${r.enabled? 'Enabled':'Disabled'}` });
        }).catch(error => showToast(this, { message: error.message }))
    }

    private async _deleteConfirm()
    {
        showConfirmDialog(this, {
            title: 'Delete switch?',
            text: `${this.config!.name} will be permanently deleted.`,
            confirmText: 'Delete',
            dismissText: 'Cancel',
            confirm: () => this._delete(),
            confirmation: true,
            destructive: true,
        });
    }

    private async _delete()
    {
        this.hass.callWS({type: buildWSPath('config/delete'), config_id: this.config!.id!.toString()}).then( r => {
            showToast(this, {
                message: 'Switch Deleted'
            })
            navigate(buildUrl());
        });
    }
}