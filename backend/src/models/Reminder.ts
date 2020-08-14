import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
} from 'typeorm';

import { Expose } from 'class-transformer';

import User from './User';
import Fruit from './Fruit';

import uploadConfig from '../config/upload';

@Entity('reminders')
class Reminder {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'user_id' })
    user: User;

    @Column()
    user_id: string;

    @ManyToOne(() => Fruit)
    @JoinColumn({ name: 'fruit_id' })
    fruits: Fruit;

    @Column()
    fruit_id: string;

    @Column()
    fruit: string;

    @Column()
    avatar: string;

    @Column('boolean')
    recurrent: boolean;

    @Column('timestamp with time zone')
    date: Date;

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

export default Reminder;
