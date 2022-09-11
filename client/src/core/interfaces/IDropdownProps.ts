export default interface IDropdownProps {
    onChange: (field: string, event: React.ChangeEvent<HTMLSelectElement>) => void,
    options: string[],
}