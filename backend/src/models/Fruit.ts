import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';

import { Expose } from 'class-transformer';

import uploadConfig from '../config/upload';

@Entity('fruits')
class Fruit {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    fruit: string;

    @Column()
    vitamins: string;

    @Column()
    avatar: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @Expose({ name: 'avatar_url' })
    getAvatarUrl(): string | null {
        if (!this.avatar) {
            return null;
        }

        switch (uploadConfig.driver) {
            case 'disk':
                return `${process.env.APP_API_URL}/files/${this.avatar}`;
            case 's3':
                return `https://${process.env.APP_API_URL}.s3.amazonaws.com/${this.avatar}`;
            default:
                return null;
        }
    }
}
export default Fruit;
