import { LitElement, TemplateResult } from "lit";
import { SwitchManagerBlueprint, SwitchManagerConfig } from "./types";
import { MODES } from "../ha-frontend/data/script";
import { fireEvent } from "../ha-frontend/common/dom/fire_event";

export const _DOMAIN = 'switch_manager'

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
        buttons: [],
        is_mismatch: false,
        rotate: 0
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