import Block from "../../utils/Block";
import template from "./profile_data_item.hbs";

interface ProfileDataItemProps {
  itemName: string;
  type: string;
  name: string;
  placeholder: string;
  onFocusout?: () => void;
  events: {
    focusout: () => void;
  };
}

export class ProfileDataItem extends Block {
  constructor(props: ProfileDataItemProps) {
    super({
      ...props,
      events: {
        focusout: props.onFocusout,
      },
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
