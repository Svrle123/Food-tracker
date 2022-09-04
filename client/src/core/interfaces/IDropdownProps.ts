export default interface IDropdownProps {
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void,
    options: string[],
}