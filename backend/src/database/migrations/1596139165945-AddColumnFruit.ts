import {
    MigrationInterface,
    QueryRunner,
    TableColumn,
    TableForeignKey,
} from 'typeorm';

export default class AddColumnFruit1596139165945 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'reminders',
            new TableColumn({
                name: 'fruit_id',
                type: 'uuid',
                isNullable: true,
            }),
        );

        await queryRunner.createForeignKey(
            'reminders',
            new TableForeignKey({
                name: 'ReminderFruit',
                columnNames: ['fruit_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'fruits',
                onDelete: 'SET NULL',
                onUpdate: 'CASCADE',
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('reminders', 'ReminderFruit');

        await queryRunner.dropColumn('reminders', 'fruit_id');
    }
}
