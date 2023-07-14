import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('boletos_lotes')
class BoletosLotes {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar', { length: 4, nullable: false })
    nome_lote: string;
    
    @Column('int', { nullable: false })
    id_lote: number;

    @CreateDateColumn()
    criado_em: Date;
}

export default BoletosLotes;
