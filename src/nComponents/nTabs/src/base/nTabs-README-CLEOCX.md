Tabs Props
Attribute	Type	Description	Default
children*	ReactNode | ((item: T) => ReactElement)	The list of tabs.	-
variant	solid | bordered | light | underlined	The tabs appearance style.	solid
color	default | primary | secondary | success | warning | danger	The tabs color theme.	default
size	sm | md | lg	The tabs size.	md
radius	none | sm | md | lg | full	The tabs border radius.	-
fullWidth	boolean	Whether the tabs should take the full width of its parent.	false
items	
Iterable<T>
The list of tabs (dynamic).	-
disabledKeys	React.Key[]	The item keys that are disabled. These items cannot be selected, focused, or otherwise interacted with.	-
selectedKey	React.Key	The key for the currently selected item.	-
defaultSelectedKey	React.Key	The key for the initially selected item.	-
shouldSelectOnPressUp	boolean	Whether the tabs selection should occur on press up instead of press down.	true
keyboardActivation	automatic | manual	Whether tabs are activated automatically on focus or manually.	automatic
motionProps	MotionProps	The props to modify the cursor framer motion animation. Use the variants API to create your own animation.	-
disableCursorAnimation	boolean	Whether the cursor should be hidden.	false
isDisabled	boolean	Whether the tab list should be disabled.	false
disableAnimation	boolean	Whether the tab list should be animated.	false
classNames	Record<"base"｜ "tabList"｜ "tab"｜ "tabContent"｜ "cursor" ｜ "panel", string>	Allows to set custom class names for the card slots.	-
placement	top | bottom | start | end	The position of the tabs.	top
isVertical	boolean	Whether the tabs are vertical.	false
destroyInactiveTabPanel	boolean	Whether to destroy inactive tab panel when switching tabs. Inactive tab panels are inert and cannot be interacted with.	true
Tabs Events
Attribute	Type	Description
onSelectionChange	(key: React.Key) => any	Handler that is called when the selection changes.
Tab Props
Attribute	Type	Description	Default
children*	ReactNode	The content of the tab.	-
title	ReactNode	The title of the tab.	-
titleValue	string	A string representation of the item's contents. Use this when the title is not readable.	-
href	string	A URL to link to. See MDN.	-
target	HTMLAttributeAnchorTarget	The target window for the link. See MDN.	-
rel	string	The relationship between the linked resource and the current page. See MDN.	-
download	boolean | string	Causes the browser to download the linked URL. A string may be provided to suggest a file name. See MDN.	-
ping	string	A space-separated list of URLs to ping when the link is followed. See MDN.	-
referrerPolicy	HTMLAttributeReferrerPolicy	How much of the referrer to send when following the link. See MDN.	-
shouldSelectOnPressUp	boolean	Whether the tab selection should occur on press up instead of press down.	-
Motion Props
export type MotionProps = HTMLMotionProps<"div">; // @see https://www.framer.com/motion/
Table
