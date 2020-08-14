import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddColumnAvatarReminder1597420974732
    implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'reminders',
            new TableColumn({
                name: 'avatar',
                type: 'varchar',
                isNullable: true,
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('reminders', 'avatar');
    }
}
