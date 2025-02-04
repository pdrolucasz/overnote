import { RedoButton } from "./RedoButton"
import { UndoButton } from "./UndoButton"

import { HeadingDropDownMenu } from "./HeadingDropDownMenu"

import { BoldButton } from "./BoldButton"
import { ItalicButton } from "./ItalicButton"
import { StrikeButton } from "./StrikeButton"
import { UnderlineButton } from "./UnderlineButton"

import { ListBulletButton } from "./ListBulletButton"
import { ListOrderedButton } from "./ListOrderedButton"
import { TextAlignDropDownMenu } from "./TextAlignDropDownMenu"

export const Controls = () => {
	return (
		<div className="flex items-center divide-x-[1px] border-b-[1px]">
			<div>
				<UndoButton />
				<RedoButton />
			</div>
			<div>
				<HeadingDropDownMenu />
			</div>
			<div>
				<BoldButton />
				<ItalicButton />
				<StrikeButton />
				<UnderlineButton />
			</div>
			<div>
				<TextAlignDropDownMenu />
				<ListBulletButton />
				<ListOrderedButton />
			</div>
		</div>
	)
}
