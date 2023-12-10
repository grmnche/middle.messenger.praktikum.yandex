import { EventBus } from "./EventBus";
import { nanoid } from "nanoid";

interface BlockProps {
  events?: Record<string, (event: Event) => void>;
  [key: string]: any;
}

interface BlockChild {
  embed: (element: HTMLElement) => void;
}

class Block {
  static EVENTS = {
    INIT: "init",
    FLOW_CDM: "flow:component-did-mount",
    FLOW_CDU: "flow:component-did-update",
    FLOW_RENDER: "flow:render",
  };

  public id = nanoid(7);
  protected props: BlockProps;
  protected refs: Record<string, Block> = {};
  public children: Record<string, Block>;
  private eventBus: () => EventBus;
  private _element: HTMLElement | null = null;
  _meta: { props: BlockProps };

  constructor(propsWithChildren: Record<string, any> = {}) {
    const eventBus = new EventBus();
    const { props, children } = this._getPropsAndChildren(propsWithChildren);

    this._meta = {
      props,
    };
    this.children = children;
    this.props = this._makePropsProxy(props);
    this.eventBus = () => eventBus;
    this._registerEvents(eventBus);
    eventBus.emit(Block.EVENTS.INIT);
  }

  _getPropsAndChildren(propsAndChildren: Record<string, any>) {
    const props: BlockProps = {};
    const children: Record<string, Block> = {};

    Object.entries(propsAndChildren).forEach(([key, value]) => {
      if (value instanceof Block) {
        children[key] = value;
      } else {
        props[key] = value;
      }
    });

    return { props, children };
  }

  _addEvents() {
    const { events = {} } = this.props;

    Object.keys(events).forEach((eventName) => {
      this._element?.addEventListener(eventName, events[eventName]);
    });
  }

  _registerEvents(eventBus: EventBus) {
    eventBus.on(Block.EVENTS.INIT, this._init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  private _init() {
    this.init();
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  protected init() { }

  _componentDidMount() {
    this.componentDidMount();
  }

  componentDidMount() { }

  public dispatchComponentDidMount() {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);

    Object.values(this.children).forEach((child) =>
      child.dispatchComponentDidMount(),
    );
  }

  private _componentDidUpdate(): boolean {
    if (this.componentDidUpdate()) {
      this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }
    return true;
  }

  protected componentDidUpdate(): boolean {
    return true;
  }

  setProps = (nextProps: BlockProps) => {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
  };

  get element() {
    return this._element;
  }

  private _render() {
    const fragment = this.render();
    const newElement = fragment.firstElementChild as HTMLElement;

    if (this._element) {
      this._element.replaceWith(newElement);
    }

    this._element = newElement;
    this._addEvents();
  }

  protected compile(
    template: (context: Record<string, unknown>) => string,
    context: Record<string, unknown>,
  ) {
    const contextAndStubs: Record<string, any> = {
      ...context,
      __refs: this.refs,
    };
    const html = template(contextAndStubs);
    const temp: HTMLElement | any = document.createElement("template");

    temp.innerHTML = html;

    contextAndStubs.__children?.forEach(({ embed }: BlockChild) => {
      embed(temp.content);
    });

    return temp.content;
  }

  protected render(): DocumentFragment {
    return new DocumentFragment();
  }

  getContent() {
    return this.element;
  }

  _makePropsProxy(props: BlockProps) {
    const self = this;

    return new Proxy(props, {
      get(target, prop: any) {
        const value = target[prop];
        return typeof value === "function" ? value.bind(target) : value;
      },

      set(target, prop: any, value) {
        const oldTarget = { ...target };

        target[prop] = value;

        self
          .eventBus()
          .emit(Block.EVENTS.FLOW_CDU, oldTarget, target as BlockProps);
        return true;
      },

      deleteProperty() {
        throw new Error("Access not allowed");
      },
    });
  }

  _createDocumentElement(tagName: string) {
    return document.createElement(tagName);
  }

  show() {
    this.getContent()!.style.display = "block";
  }

  hide() {
    this.getContent()!.style.display = "none";
  }
}

export default Block;
