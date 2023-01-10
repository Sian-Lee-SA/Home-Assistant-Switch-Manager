/*export const MODES = ["single", "restart", "queued", "parallel"] as const;
export const MODES_MAX = ["queued", "parallel"] as const;
export const isMaxMode = (
    mode: typeof MODES[number]
  ): mode is typeof MODES_MAX[number] =>
    MODES_MAX.includes(mode as typeof MODES_MAX[number]);
*/
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
    shape: string;
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
    blueprint: SwitchManagerBlueprint;
    valid_blueprint: boolean;
    variables: any;
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