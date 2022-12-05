import { property, state } from "lit/decorators.js";
import { html, LitElement } from "lit";
import { loadComponents } from "./helpers";
import "./index";
import "./switch-editor";

class SwitchManagerPanel extends LitElement 
{
    @property() hass!: any;

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
        loadComponents();
        this.hass.loadFragmentTranslation("config");
    }
}
customElements.define('switch-manager-panel', SwitchManagerPanel)