import { html, css, LitElement } from "lit";
import { customElement, property, state, query } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import {
    mdiContentSave,
    mdiArrowLeft,
    mdiContentCopy,
    mdiRenameBox,
    mdiDotsVertical,
    mdiDelete,
    mdiStopCircleOutline,
    mdiPlayCircleOutline,
    mdiGestureTapButton,
    mdiBug,
    mdiCheck,
    mdiCodeBraces,
    mdiFileDocumentEditOutline,
    mdiViewDashboardEditOutline,
    mdiIdentifier,
    mdiRotateRight
} from "@mdi/js";
import { SwitchManagerBlueprint, SwitchManagerConfig, SwitchManagerConfigButton } from "./types";
import { MODES } from "../ha-frontend/data/script";
import { 
    buildAssetUrl, 
    buildUrl, 
    buildWSPath, 
    createConfigFromBlueprint,
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
import "../ha-frontend/components/ha-yaml-editor";
import type { HaYamlEditor } from "../ha-frontend/components/ha-yaml-editor";
import { showConfirmationDialog } from "../ha-frontend/dialogs/generic/show-dialog-box";
import { afterNextRender } from "../ha-frontend/common/util/render-status";
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

    @state() private _subscribedMonitor?: () => void;
    @state() private _reloadListener?: () => void;

    @state() private sequence: any[] = [];
    @state() private button_index: number = 0;
    @state() private action_index: number = 0;

    @state() private is_new: boolean = true;
    @state() private _is_yaml: boolean = false;
    @state() private _dirty: boolean = false;
    @state() private _debug: boolean = false;
    @state() private _block_save: boolean = false;
    @state() private _errors?: string;

    @query('#switch-svg') svg;
    @query('switch-manager-button-actions') button_actions;
    @query("ha-yaml-editor") private _yamlEditor?: HaYamlEditor;

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
                            @click=${this._backTapped}>
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
                                    .disabled=${!this.config || this.config?._error}
                                    @click=${this._showIdentifierAutoDiscoveryDialog}>
                                        Identifier
                                        <ha-svg-icon slot="graphic" .path=${mdiIdentifier}>
                                        </ha-svg-icon>
                                </mwc-list-item>

                                <mwc-list-item
                                    graphic="icon"
                                    @click=${this._showRenameDialog}>
                                        Rename
                                        <ha-svg-icon slot="graphic" .path=${mdiRenameBox}>
                                        </ha-svg-icon>
                                </mwc-list-item>

                                <mwc-list-item
                                    graphic="icon"
                                    @click=${this._rotate}>
                                        Rotate
                                        <ha-svg-icon slot="graphic" .path=${mdiRotateRight}>
                                        </ha-svg-icon>
                                </mwc-list-item>

                                <mwc-list-item
                                    graphic="icon"
                                    .disabled=${!this.config || this.config?._error}
                                    @click=${this._showVariablesEditorDialog}>
                                        Variables
                                        <ha-svg-icon
                                            slot="graphic"
                                            .path=${mdiCodeBraces}>
                                        </ha-svg-icon>
                                </mwc-list-item>

                                <mwc-list-item
                                    graphic="icon"
                                    .disabled=${!this.config || this.config?._error}
                                    @click=${this._showCopyFromDialog}>
                                        Copy From
                                        <ha-svg-icon
                                            slot="graphic"
                                            .path=${mdiContentCopy}>
                                        </ha-svg-icon>
                                </mwc-list-item>
                                
                                <mwc-list-item
                                    graphic="icon"
                                    .disabled=${!this.config || this.is_new || this.config?._error}
                                    @click=${this._toggleEnabled}>
                                        ${!this.config?.enabled ? 'Enable' : 'Disable'}
                                        <ha-svg-icon
                                            slot="graphic"
                                            .path=${!this.config?.enabled ? mdiPlayCircleOutline : mdiStopCircleOutline}>
                                        </ha-svg-icon>
                                </mwc-list-item>
                                
                                <li divider role="separator"></li>
                                
                                <mwc-list-item
                                    graphic="icon"
                                    .disabled=${!this.config || this.is_new || this.config?._error}
                                    @click=${this._toggleDebug}>
                                        Debug
                                        <ha-svg-icon
                                            slot="graphic"
                                            .path=${this._debug ? mdiCheck : mdiBug}>
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
                    ${!this.config?._error ? html`
                    <h3 id="blueprint-name">${this.blueprint?.service} / ${this.blueprint?.name}</h3>`:''}

                    <div id="switch-image" rotate="${this.config.rotate}">
                    ${this.blueprint && !this.blueprint?.has_image ?
                        html`<ha-svg-icon .path=${mdiGestureTapButton}></ha-svg-icon>` :
                        html`<svg id="switch-svg"></svg>`}
                    </div>

                    ${!this.config?._error ? html`
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
                                ${this.config.is_mismatch ? html`<mwc-button slot="action" @click=${this._fixMismatch}>Fix</mwc-button>` : ''}
                            </ha-alert>` : ''}

                            ${this.config && !this.config.enabled ? html`
                            <ha-alert alert-type="info">
                                Switch is disabled
                                <mwc-button slot="action" @click=${this._toggleEnabled}>
                                    Enable
                                </mwc-button>
                            </ha-alert>` : ''}
                            ${!this.config?._error ? html`
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

                                    <ha-button-menu corner="TOP_START" slot="toolbar-icon">
                                        <ha-icon-button
                                            slot="trigger"
                                            .label=${this.hass.localize("ui.common.menu")}
                                            .path=${mdiDotsVertical}>
                                        </ha-icon-button>
        
                                        <mwc-list-item
                                            graphic="icon"
                                            @click=${this._toggleYaml}>
                                                ${!this._is_yaml ? 'Yaml Editor' : 'Visual Editor'}
                                                <ha-svg-icon slot="graphic" .path=${!this._is_yaml? mdiFileDocumentEditOutline : mdiViewDashboardEditOutline}>
                                                </ha-svg-icon>
                                        </mwc-list-item>
                                    </ha-button-menu>

                                </div>

                                ${this._is_yaml ? html`
                                <ha-yaml-editor
                                    .hass=${this.hass}
                                    .value=${this.sequence}
                                    @value-changed=${this._configSequenceChanged}>
                                </ha-yaml-editor>` 
                                : html`
                                <ha-automation-action
                                    .hass=${this.hass}
                                    role="region"
                                    aria-labelledby="sequence-heading"
                                    .actions=${this.sequence}
                                    @value-changed=${this._configSequenceChanged}
                                    .narrow=${this.narrow}
                                    .disabled=${this.disabled}>
                                </ha-automation-action>`}

                            </div>`:''}
                        </div>
                    </ha-card>
                    
                    ${!this.config?._error ? html`
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
            @keyframes pressed {
                to {
                    fill: #3ff17975;
                    stroke: #00e903;
                }
            }
            :host {
                --max-width: 1040px;
            }
            ha-app-layout {
                z-index: 5;
            }
            mwc-list-item {
                min-width: 165px;
            }
            ha-card {
                margin: 0 auto;
                max-width: var(--max-width);
                --mdc-select-fill-color: transparent;
            }
            switch-manager-button-actions {
                max-width: var(--max-width);
                margin: 0 auto;
            }
            h3 {
                padding-left: 25px;
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
            #switch-image[rotate="1"] svg {
                rotate: 90deg;
                max-width: 380px;
            }
            #switch-image[rotate="2"] svg {
                rotate: 180deg;
            }
            #switch-image[rotate="3"] svg {
                rotate: 270deg;
                max-width: 380px;
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
            #switch-image svg .button[pressed] {
                animation: 0.4s pressed;
                animation-iteration-count: 2;
                animation-direction: alternate;
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
        this.startListeners();
    }

    disconnectedCallback(): void 
    {
        this._killListener( '_reloadListener' );
        this._killListener( '_subscribedMonitor' );
        super.disconnectedCallback();
    }

    // Can't pass by reference so use string to access propery (not ideal)
    private _killListener( listener: string )
    {
        if( this[listener] )
        {
            this[listener]();
            this[listener] = undefined;
            return true;
        }
        return false;
    }
    
    private async startListeners()
    {
        this._reloadListener = await this.hass!.connection.subscribeEvents( (event) => {
            if( event.data.domain == 'switch_manager' && event.data.service == 'reload' )
            {
                this._loadConfig();
            }
        }, 'call_service' );
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
        this._monitor();
    }

    private async _monitor()
    {
        if( this.is_new )
            return;

        // Start fresh
        this._killListener('_subscribedMonitor');
        this._subscribedMonitor = await this.hass.connection.subscribeMessage((msg) => {
            
            if( msg.event == 'action_triggered' )
            {
                if( ! this.config?.identifier )
                    return;

                if( msg.button == this.button_index && this.blueprint?.buttons[this.button_index].actions.length! > 1 )
                {
                    this.button_actions.flash(msg.action)
                }

                if( this.blueprint?.buttons?.length == 1 )
                {
                    showToast(this, {
                        message: 'Button Pressed'
                    });
                    return;
                }

                const element = this.svg.querySelector(`[index="${msg.button}"]`);
                element.removeAttribute('pressed');
                element.setAttribute('pressed', '');
                setTimeout(() => {
                    element.removeAttribute('pressed');
                }, 1000);
            }

            if( ( msg.event == 'incoming' || msg.event =='action_triggered' ) && this._debug )
            {
                console.log( msg )
            }
        }, { type: buildWSPath('config/monitor'), config_id: this.config!.id });
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
        
        // As this could be a reload, we ensure svg is empty
        this.svg.parentNode.replaceChild(this.svg.cloneNode(false), this.svg);

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
                if( button.x > -1 && button.y > -1 && button.width > 0 && button.height > 0 ) {
                    svgshape = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
                    svgshape.setAttributeNS(null, 'x', button.x.toString());
                    svgshape.setAttributeNS(null, 'y', button.y.toString());
                    svgshape.setAttributeNS(null, 'width', button.width.toString());
                    svgshape.setAttributeNS(null, 'height', button.height.toString());
                } else if ( button.x > -1 && button.y > -1 && button.width > 0 ) {
                    svgshape = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
                    svgshape.setAttributeNS(null, 'cx', button.x.toString());
                    svgshape.setAttributeNS(null, 'cy', button.y.toString());
                    svgshape.setAttributeNS(null, 'r', button.width.toString());
                } else if ( button.d ) {
                    svgshape = document.createElementNS('http://www.w3.org/2000/svg', 'path');
                    svgshape.setAttributeNS(null, 'd', button.d.toString());
                } else {
                    return;
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
        if( ! this.config?.identifier )
        {
            this._showIdentifierAutoDiscoveryDialog();
            return false;
        }
        return true;
    }

    private _save()
    {
        if( this._block_save || !this._validate() || !this.config || this.config._error )
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
                this._monitor();
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
        if( this._is_yaml )
            this._yamlEditor?.setValue( this.sequence );
    }

    private _configSequenceChanged(ev: CustomEvent) 
    {   
        if( this._is_yaml )
        {
            if( ! ev.detail.value || ! Array.isArray(ev.detail.value) )
                ev.detail.value = [];
        }
        this.requestUpdate('config');
        this._updateSequence(ev.detail.value);
        this._errors = undefined;
        this._dirty = true;
    }

    private _rotate()
    {
        this.config!.rotate = (this.config!.rotate >= 3) ? 0 : this.config!.rotate + 1;
        this.requestUpdate('config');
        this._dirty = true;
    }

    private _toggleDebug()
    {
        this._debug = !this._debug;
        showToast( this, {
            message: `Debug ${this._debug ? 'Enabled. View dev console' : 'Disabled'}`
        })
    }

    private _toggleYaml()
    {
        this._is_yaml = !this._is_yaml;

        // Ensure Yaml Editor is in DOM
        // await this.updateComplete;
        this.updateComplete.then(() => {
            if( this._is_yaml )
                this._yamlEditor?.setValue( this.sequence );
        });
    }

    private _modeValueChanged(ev: CustomEvent)
    {
        if( this.config?.buttons[this.button_index].actions[this.action_index].mode == ev.detail.value )
            return;

        this.config!.buttons[this.button_index].actions[this.action_index].mode = ev.detail.value;
        this.requestUpdate('config');
        this._dirty = true;
    }

    private async _showIdentifierAutoDiscoveryDialog(): Promise<void>
    {
        fireEvent(this, "show-dialog", {
            dialogTag: "switch-manager-dialog-identifier-auto-discovery",
            dialogImport: () => import("./dialogs/dialog-identifier-auto-discovery"),
            dialogParams: {
                switch_id: this.config!.id,
                identifier: this.config!.identifier,
                blueprint: this.blueprint,
                update: (params) => {
                    this.config!.identifier = params.identifier;
                    this._dirty = true;
                    this.requestUpdate();
                },
                onClose: () => {}
            },
        });        
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
                onClose: () => {
                    if( this.is_new )
                        this._showIdentifierAutoDiscoveryDialog();
                }
            },
        });
    }

    private async _showCopyFromDialog(): Promise<void>
    {
        fireEvent(this, "show-dialog", {
            dialogTag: "switch-manager-dialog-copy-from",
            dialogImport: () => import("./dialogs/dialog-copy-from"),
            dialogParams: {
                blueprint_id: this.config!.blueprint.id,
                current_switch_id: this.config!.id,
                update: (config) => {
                    console.dir( config );
                    this.config!.buttons = config.buttons;
                    if( config.variables !== false )
                        this.config!.variables = config.variables;
                    this._dirty = true;
                    this._updateSequence();
                    this._drawSVG();
                },
                onClose: () => {}
            },
        });
    }

    private async _showVariablesEditorDialog(): Promise<void>
    {
        fireEvent(this, "show-dialog", {
            dialogTag: "switch-manager-dialog-variables-editor",
            dialogImport: () => import("./dialogs/dialog-variables-editor"),
            dialogParams: {
                config: this.config,
                update: (config) => {
                    this.config!.variables = config.variables;
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

    private async confirmUnsavedChanged(): Promise<boolean> 
    {
        if (this._dirty) {
            return showConfirmationDialog(this, {
                title: this.hass!.localize(
                    "ui.panel.config.automation.editor.unsaved_confirm_title"
                ),
                text: this.hass!.localize(
                    "ui.panel.config.automation.editor.unsaved_confirm_text"
                ),
                confirmText: this.hass!.localize("ui.common.leave"),
                dismissText: this.hass!.localize("ui.common.stay"),
                destructive: true,
            });
        }
        return true;
    }

    private async _fixMismatch() 
    {
        if( ! this.config!.is_mismatch )
            return;

        let buttons = this.config!.buttons.slice(0, this.config!.blueprint.buttons.length);
        this.config!.blueprint.buttons.forEach((b, b_index) => {
            if( ! buttons[b_index] )
            {
                buttons[b_index] = {
                    actions: []
                }
            }
            buttons[b_index].actions = buttons[b_index].actions.slice(0, b.actions.length);
            b.actions.forEach((a, a_index) => {
                if( ! buttons[b_index].actions[a_index] )
                {
                    buttons[b_index].actions[a_index] = {
                        mode: MODES[0],
                        sequence: []
                    }
                }
            });
        });

        this.config!.buttons = buttons;
        this._errors = undefined;

        this.hass.callWS({
            type: buildWSPath('config/save'), 
            config: {...this.config, blueprint: this.config!.blueprint.id},
            fix_mismatch: true
        }).then(r => {
            this._loadConfig();
            showToast(this, { message: 'Fixed, Now Double Check Your Config!' });
        }).catch(error => {
            showToast(this, { message: error.message });
        });
    }
    
    private _backTapped = async () => 
    {
        const result = await this.confirmUnsavedChanged();
        if (result) {
            afterNextRender(() => navigate(buildUrl()));
        }
    }
}