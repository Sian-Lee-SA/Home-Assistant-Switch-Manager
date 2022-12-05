import { mdiClose } from "@mdi/js";
import { html, LitElement, TemplateResult } from "lit";
import { MODES, SwitchManagerBlueprint, SwitchManagerConfig } from "./types";
import { fireEvent } from "./hass";

export const _DOMAIN = 'switch_manager'

export function computeRTL(hass: any) 
{
    const lang = hass.language || "en";
    if (hass.translationMetadata.translations[lang]) {
        return hass.translationMetadata.translations[lang].isRTL || false;
    }
    return false;
}

export const computeRTLDirection = (hass: any)  =>
{
    return emitRTLDirection(computeRTL(hass));
}
  
export const emitRTLDirection = (rtl: boolean) =>
{
    return rtl ? "rtl" : "ltr";
}

export const buildUrl = (suffix?: string): string =>
{
    if( ! suffix )
        return `/${_DOMAIN}`;
    return `/${_DOMAIN}/${suffix}`;
}

export const buildAssetUrl = (asset: string): string =>
{
    return `/assets/${_DOMAIN}/${asset}`;
}

export const buildWSPath = (suffix: string): string =>
{
    return `${_DOMAIN}/${suffix}`;
}

export const getValueById = (dom: LitElement, id: string, in_render_root: boolean = true): string =>
{
    if( in_render_root )
        return (<HTMLInputElement>dom.renderRoot.querySelector(`#${id}`)).value.toString().trim();
    return (<HTMLInputElement>dom.querySelector(`#${id}`)).value.toString().trim();
}

export const createConfigFromBlueprint = ( blueprint: SwitchManagerBlueprint ): SwitchManagerConfig =>
{
    let config: SwitchManagerConfig = {
        id: null,
        name: 'New Switch',
        enabled: true,
        identifier: '',
        blueprint: blueprint,
        valid_blueprint: true,
        buttons: []
    };

    blueprint.buttons.forEach((button, i) => {
        config.buttons[i] = {
            actions: []
        };
        button.actions.forEach( (action, ii) => {
            config.buttons[i].actions[ii] = {
                mode: MODES[0],
                sequence: []
            };
        });
    });
    return config;
}

export const navigate = (ev) =>
{
    if( typeof ev == 'string' )
    {
        window.history.pushState({}, null, ev);
        window.dispatchEvent(new PopStateEvent('popstate'));
        return false;
    }
    
    var target = ev.target;
    if( target.localName !== 'a' )
        target = target.closest('a');
        
    if (target.localName === 'a' && target.href) {
        window.history.pushState({}, null, target.href);
        window.dispatchEvent(new PopStateEvent('popstate'));
    }
    return false;
}

export const loadComponents = async() => {
    if( customElements.get('ha-automation-action') && customElements.get('ha-data-table') )
    {
        return;
    }
    
    await customElements.whenDefined("partial-panel-resolver");
    const ppResolver = document.createElement("partial-panel-resolver");
    const routes = (ppResolver as any).getRoutes([
      {
        component_name: "config",
        url_path: "_sw",
      },
    ]);
    await routes?.routes?._sw?.load?.();
    await customElements.whenDefined("ha-panel-config");
    const configRouter: any = document.createElement("ha-panel-config");
    await configRouter?.routerOptions?.routes?.dashboard?.load?.(); // Load ha-config-dashboard
    await configRouter?.routerOptions?.routes?.script?.load?.(); // Load ha-data-table, editor
    await customElements.whenDefined("ha-config-dashboard");
}

export const createCloseHeading = (
    title: string | TemplateResult
) => html`
    <div class="header_title">${title}</div>
    <ha-icon-button
      .label=${'Close'}
      .path=${mdiClose}
      dialogAction="close"
      class="header_button"></ha-icon-button>`;

export const showToast = (el: HTMLElement, params) =>
  fireEvent(el, "hass-notification", params);

export interface ConfirmationDialogParams {
    title?: string;
    text?: string | TemplateResult;
    dismissText?: string;
    confirmText?: string;
    confirm?: (out?: string) => void;
    cancel?: () => void;
    destructive?: boolean;
    confirmation?: boolean;
    prompt?: boolean;
    warning?: boolean;
}

export const showConfirmDialog = (
    element: HTMLElement,
    dialogParams: ConfirmationDialogParams
) => new Promise((resolve) => {
    const origCancel = dialogParams.cancel;
    const origConfirm = dialogParams.confirm;

    fireEvent(element, "show-dialog", {
      dialogTag: "switch-manager-dialog-confirm",
      dialogImport: () => import("./dialogs/dialog-confirm"),
      dialogParams: {
        ...dialogParams,
        cancel: () => {
            resolve(dialogParams?.prompt ? null : false);
            if (origCancel) {
                origCancel();
            }
        },
        confirm: () => {
            resolve(dialogParams?.prompt ? null : true);
            if (origConfirm) {
                origConfirm();
            }
        },
      },
    });
});