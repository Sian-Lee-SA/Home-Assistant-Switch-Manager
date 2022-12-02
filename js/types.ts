export const MODES = ["single", "restart", "queued", "parallel"] as const;
export const MODES_MAX = ["queued", "parallel"] as const;
export const isMaxMode = (
    mode: typeof MODES[number]
  ): mode is typeof MODES_MAX[number] =>
    MODES_MAX.includes(mode as typeof MODES_MAX[number]);

export interface SwitchManagerBlueprint
{
    id: string;
    name: string;
    service: string;
    has_image: boolean;
    identifier_key: string;
    buttons: SwitchManagerBlueprintButton[];
}

export interface SwitchManagerBlueprintButton
{
    x: number;
    y: number;
    d: string;
    width: number;
    height: number;
    shape: string;
    actions: SwitchManagerBlueprintButtonAction[];
}

export interface SwitchManagerBlueprintButtonAction
{
    title: string;
}

export interface SwitchManagerConfig
{
    id: number|null;
    name: string;
    enabled: boolean;
    identifier: string;
    blueprint: SwitchManagerBlueprint;
    valid_blueprint: boolean;
    buttons: SwitchManagerConfigButton[];
    _error?: string;
}

export interface SwitchManagerConfigButton
{
    actions: SwitchManagerConfigButtonAction[];
}

export interface SwitchManagerConfigButtonAction
{
    mode: typeof MODES[number];
    sequence: any[];
}

export interface ShowToastParams {
    message: string;
    action?: ToastActionParams;
    duration?: number;
    dismissable?: boolean;
}

export interface ToastActionParams {
    action: () => void;
    text: string;
}
