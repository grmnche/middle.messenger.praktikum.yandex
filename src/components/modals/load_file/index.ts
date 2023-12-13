import Block from "../../../utils/Block";
import template from "./load_file.hbs";

interface LoadFileProps {
  loadingFileStatus: string;
}

export class LoadFile extends Block {
  constructor(props: LoadFileProps) {
    super({
      ...props,
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
