import { MODES } from "../ha-frontend/data/script";

export interface SwitchManagerBlueprintCondition
{
    key: string;
    value: string;
}

export interface SwitchManagerBlueprint
{
    id: string;
    name: string;
    service: string;
    event_type: string;
    identifier_key?: string;
    info?: string;
    conditions?: SwitchManagerBlueprintCondition[],
    has_image: boolean;
    mqtt_topic_format?: string;
    buttons: SwitchManagerBlueprintButton[];
}

export interface SwitchManagerBlueprintButton
{
    x: number;
    y: number;
    d: string;
    width: number;
    height: number;
    conditions?: SwitchManagerBlueprintCondition[],
    actions: SwitchManagerBlueprintButtonAction[];
}

export interface SwitchManagerBlueprintButtonAction
{
    title: string;
    conditions?: SwitchManagerBlueprintCondition[],
}

export interface SwitchManagerConfig
{
    id: number|null;
    name: string;
    enabled: boolean;
    identifier: string;
    is_mismatch: boolean;
    blueprint: SwitchManagerBlueprint;
    valid_blueprint: boolean;
    variables?: any;
    rotate: number;
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