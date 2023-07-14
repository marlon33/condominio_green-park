import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('pdf_order')
class PdfOrder {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('int', { nullable: false })
    id_lote: number;

    @Column('int', { nullable: false })
    pdf_order: number;

    @CreateDateColumn()
    criado_em: Date;
}

export default PdfOrder;
