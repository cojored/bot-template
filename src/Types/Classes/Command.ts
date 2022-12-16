import {
  AnySelectMenuInteraction,
  AutocompleteInteraction,
  ButtonInteraction,
  CommandInteraction,
  Message,
  ModalSubmitInteraction,
} from "discord.js";
import CommandConstructorArguments from "../Interfaces/CommandConstructorArguments.js";
import CommandType from "../Interfaces/CommandType.js";

export default class Command {
  private _name: string;
  private _description: string;
  private _enabled: boolean;
  private _type!: CommandType;

  private executeCallback?: Function;
  private autoCompleteCallback?: Function;
  private buttonCallback?: Function;
  private modalCallback?: Function;
  private selectMenuCallback?: Function;

  constructor(data: CommandConstructorArguments) {
    this._name = data.name ?? "";
    this._description = data.description ?? "";
    this._enabled = data.enabled ?? true;
    this._type = data._type!;
  }

  // Make properties only accesible read only outside of the class
  get enabled() {
    return this._enabled;
  }
  get name() {
    return this._name;
  }
  get description() {
    return this._description;
  }
  get type() {
    return this._type;
  }

  // Make properties modifiable outside of the class via functions
  setName(name: string) {
    this._name = name;
  }
  setDescription(description: string) {
    this._description = description;
  }
  setEnabled(enabled: boolean) {
    this._enabled = enabled;
  }

  execute(data: Function | Message | CommandInteraction, args?: string[]) {
    if (typeof data === "function") this.executeCallback = data;
    else if (this.executeCallback)
      if (args) this.executeCallback(data, args);
      else this.executeCallback(data);
  }
  autocomplete(data: Function | AutocompleteInteraction, name?: string) {
    if (typeof data === "function") this.autoCompleteCallback = data;
    else if (this.autoCompleteCallback) this.autoCompleteCallback(data, name);
  }
  button(data: Function | ButtonInteraction, name?: string) {
    if (typeof data === "function") this.buttonCallback = data;
    else if (this.buttonCallback) this.buttonCallback(data, name);
  }
  modal(data: Function | ModalSubmitInteraction, name?: string) {
    if (typeof data === "function") this.modalCallback = data;
    else if (this.modalCallback) this.modalCallback(data, name);
  }
  selectMenu(data: Function | AnySelectMenuInteraction, name?: string) {
    if (typeof data === "function") this.selectMenuCallback = data;
    else if (this.selectMenuCallback) this.selectMenuCallback(data, name);
  }
}
