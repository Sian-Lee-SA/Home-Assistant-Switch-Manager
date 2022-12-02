import { customElement, property, state } from "lit/decorators.js";
import { html, LitElement } from "lit";

import "./index";
import "./switch-editor";
import { loadComponents } from "./helpers";

@customElement('switch-manager-panel')
class SwitchManagerPanel extends LitElement 
{
    @property({ attribute: false }) hass!: any;
    @property() narrow;
    @property() panel;
    @state() params = {};

    private _route;
    get route() { return this._route };
    @property() set route( route ) {
        this._route = route;
        let parts = route.path.split('/');
        if( parts[1] == 'new') {
            this.params = { action: 'new', blueprint: parts[2] }
        } else if( parts[1] == 'edit' ) {
            this.params = { action: 'edit', id: parts[2] }
        } else {
            this.params = {};
        }
    };

    constructor()
    {
        super();        
        loadComponents();
    }

    render()
    {
        if( 'action' in this.params )
            return html`        
                <switch-manager-switch-editor .hass=${this.hass} .narrow=${this.narrow} .route=${this.route} .params=${this.params}></switch-manager-index>
            `;
        return html`
                <switch-manager-index .hass=${this.hass} .narrow=${this.narrow} .route=${this.route}>
            `;
    }

    protected firstUpdated(changedProps) 
    {
        super.firstUpdated(changedProps);
        this.hass.loadFragmentTranslation("config");
    }
}