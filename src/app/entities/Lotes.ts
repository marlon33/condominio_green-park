import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('lotes')
class Lotes {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar', { length: 100, nullable: false })
    nome: string;
    
    @Column('boolean', { default: true })
    ativo: boolean;

    @CreateDateColumn()
    criado_em: Date;
}

export default Lotes;
