import React from "react";

export interface IDropdownProps {
    onSelect: (event: React.MouseEvent<HTMLOptionElement>) => void,
    options: string[],
}