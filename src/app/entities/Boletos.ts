import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('boletos')
class Boletos {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar', { length: 100, nullable: false })
    nome_sacado: string;
    
    @Column('int', { nullable: false })
    id_lote: number;

    @Column('float', { nullable: false })
    valor: number;

    @Column('varchar', { length: 255, nullable: false })
    linha_digitavel: string;

    @Column('boolean', { default: true })
    ativo: boolean;

    @CreateDateColumn()
    criado_em: Date;
}

export default Boletos;
