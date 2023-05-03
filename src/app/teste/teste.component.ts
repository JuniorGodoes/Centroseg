import { Component, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Subscription } from 'rxjs';


// We use the gql tag to parse our query string into a query document
const GET_ORDENS = gql`
  query ordensServico($skip: Int!, $take: Int!, $aberturaDe: DateTime!, $aberturaAte: DateTime! ) {
    ordensServico(skip: $skip, take: $take, aberturaDe: $aberturaDe, aberturaAte: $aberturaAte ) {
      id
      sequencia
      status
      idContaCliente
      nomeCliente
      descricaoSolicitacao
      descricaoSolucao
      getTecnicoExecutor {nome}
      criadoEm
      fimExecucao
      valorTotal
      getContaCliente{codigo, particao,receptora,nomeInformal}
    }
  }
`;

@Component({
  selector: 'app-teste',
  templateUrl: './teste.component.html',
  styleUrls: ['./teste.component.css']
})

export class TesteComponent {
  title = 'centroseg';
  ordens: any[] = [];

  private querySubscription: Subscription | null = null;

  constructor(private apollo: Apollo) {}

  async ngOnInit() {
    await this.refreshAllOrdens();
    console.log(this.ordens)
  }

  async refreshAllOrdens() {
    this.ordens = [];
    await this.fillOrdensRecursive();
    alert('terminou');
  }

  async fillOrdensRecursive(pageIndex = 0) {
    try {
      const { data } = await this.apollo
        .watchQuery<any>({
          query: GET_ORDENS,
          variables: {
            skip: pageIndex * 1000,
            take: 1000,
            aberturaDe: '2023-01-01 00:00:00',
            aberturaAte: '2023-12-31 00:00:00'
          },
        })
        .refetch();

      const ordensServico = data.ordensServico as any[];
      this.ordens = this.ordens.concat(ordensServico);

      if (ordensServico.length > 0) {
        await this.fillOrdensRecursive(pageIndex + 1);
      }
    } catch (error) {
      console.error(error);
    }
  }
}
