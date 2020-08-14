interface ITemplateVariable {
    [key: string]: string | number;
}

export default interface IParceMailTemplateDTO {
    file: string;
    variables: ITemplateVariable;
}
