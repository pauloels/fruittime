// define quais dados eu preciso para criar um reminder
export default interface ICreateReminderDTO {
    fruit: string;
    recurrent: boolean;
    date: Date[];
    user_id: string;
    fruit_id: string;
    avatar: string;
}
