import { customElement, property, state } from "lit/decorators.js";
import { html, LitElement, PropertyValues } from "lit";
import { applyThemesOnElement } from "../ha-frontend/common/dom/apply_themes_on_element";
import { HomeAssistant } from "../ha-frontend/types";
import { Constructor } from "../ha-frontend/types";
import NotificationMixin from "../ha-frontend/state/notification-mixin";
import { dialogManagerMixin } from "../ha-frontend/state/dialog-manager-mixin";
import "../ha-frontend/types";
import "../ha-frontend/resources/ha-style";
import "../ha-frontend/resources/roboto";
import "./index";
import "./switch-editor";

declare global {
    interface HTMLElementTagNameMap {
      "switch-manager-panel": SwitchManagerPanel;
    }
}

const ext = <T extends Constructor>(baseClass: T, mixins): T =>
  mixins.reduceRight((base, mixin) => mixin(base), baseClass);

@customElement("switch-manager-panel")
class SwitchManagerPanel extends ext(LitElement, [dialogManagerMixin, NotificationMixin])
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
                <switch-manager-switch-editor .hass=${this.hass} .narrow=${this.narrow} .route=${this.route} .panel=${this.panel} .params=${this.params}></switch-manager-switch-editor>
            `;
        return html`
                <switch-manager-index .hass=${this.hass} .narrow=${this.narrow} .route=${this.route} .panel=${this.panel}></switch-manager-index>
            `;
    }

    public provideHass(el) {
        el.hass = this.hass;
    }

    protected firstUpdated(changedProps) 
    {
        super.firstUpdated(changedProps);
        this.hass.loadFragmentTranslation("config");

        this._applyTheme();
    }

    protected updated(changedProps: PropertyValues) {
        super.updated(changedProps);
        const oldHass = changedProps.get("hass") as HomeAssistant | undefined;
        if (!oldHass) {
          return;
        }
        if (oldHass.themes !== this.hass.themes) {
          this._applyTheme();
        }
    }

    private _applyTheme() {
        applyThemesOnElement(
          this.parentElement,
          this.hass.themes,
          this.hass.selectedTheme?.theme ||
            (this.hass.themes.darkMode && this.hass.themes.default_dark_theme
              ? this.hass.themes.default_dark_theme!
              : this.hass.themes.default_theme),
          {
            ...this.hass.selectedTheme,
            dark: this.hass.themes.darkMode,
          }
        );
        this.style.backgroundColor = "var(--primary-background-color)";
        this.style.color = "var(--primary-text-color)";
      }
}