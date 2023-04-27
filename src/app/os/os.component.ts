import { Component, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Subscription } from 'rxjs';

// We use the gql tag to parse our query string into a query document
const GET_POSTS = gql`
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
  selector: 'app-os',
  templateUrl: './os.component.html',
  styleUrls: ['./os.component.css']
})



export class OSComponent implements OnInit{
  title = 'centroseg';
  loading: boolean = true;
  ordens: any = []
  qtdeos:boolean = false
  status:any = []
  filtro:boolean = true
  spinner:boolean = false

  totalOS = 0
  totalOSjan = 0
  totalOSfev = 0
  totalOSmar = 0
  totalOSabr = 0
  totalOSmai = 0
  totalOSjun = 0
  totalOSjul = 0
  totalOSago = 0
  totalOSset = 0
  totalOSout = 0
  totalOSnov = 0
  totalOSdez = 0

  totalconcluida = 0
  concluidaOSjan = 0
  concluidaOSfev = 0
  concluidaOSmar = 0
  concluidaOSabr = 0
  concluidaOSmai = 0
  concluidaOSjun = 0
  concluidaOSjul = 0
  concluidaOSago = 0
  concluidaOSset = 0
  concluidaOSout = 0
  concluidaOSnov = 0
  concluidaOSdez = 0

  totalconferida = 0
  conferidaOSjan = 0
  conferidaOSfev = 0
  conferidaOSmar = 0
  conferidaOSabr = 0
  conferidaOSmai = 0
  conferidaOSjun = 0
  conferidaOSjul = 0
  conferidaOSago = 0
  conferidaOSset = 0
  conferidaOSout = 0
  conferidaOSnov = 0
  conferidaOSdez = 0

  totalpendente = 0
  pendenteOSjan = 0
  pendenteOSfev = 0
  pendenteOSmar = 0
  pendenteOSabr = 0
  pendenteOSmai = 0
  pendenteOSjun = 0
  pendenteOSjul = 0
  pendenteOSago = 0
  pendenteOSset = 0
  pendenteOSout = 0
  pendenteOSnov = 0
  pendenteOSdez = 0

  totalexecutando = 0
  executandoOSjan = 0
  executandoOSfev = 0
  executandoOSmar = 0
  executandoOSabr = 0
  executandoOSmai = 0
  executandoOSjun = 0
  executandoOSjul = 0
  executandoOSago = 0
  executandoOSset = 0
  executandoOSout = 0
  executandoOSnov = 0
  executandoOSdez = 0

  totalempausa = 0
  empausaOSjan = 0
  empausaOSfev = 0
  empausaOSmar = 0
  empausaOSabr = 0
  empausaOSmai = 0
  empausaOSjun = 0
  empausaOSjul = 0
  empausaOSago = 0
  empausaOSset = 0
  empausaOSout = 0
  empausaOSnov = 0
  empausaOSdez = 0

  private querySubscription: Subscription | null = null;

  constructor(private apollo: Apollo) {}

  ngOnInit(): void {
  }


  Execute(ano:any){

    this.filtro = false
    this.spinner = true

    let num = 0
    let qtde = 1000

    while(num < 9000){

      this.querySubscription = this.apollo
      .watchQuery<any>({
        query: GET_POSTS,
        variables: { skip:num, take:qtde, aberturaDe: `${ano}-01-01`, aberturaAte: `${ano}-12-31` },
      })
      .valueChanges.subscribe(({ data, loading }) => {
        this.loading = loading;
        data.ordensServico.forEach((element:any) => {
          this.ordens.push(element)
        });

      });

      num += 1000
    }

    this.ordens.forEach((os: any) => {

      if(this.status.find((dados:any) => dados == os.status)){

      }else{
        this.status.push(os.status)
      }

      let data = new Date (os.criadoEm)
      let mes = data.getMonth()+1
      
      this.totalOS += 1
      if(mes == 1){ this.totalOSjan += 1}
      if(mes == 2){ this.totalOSfev += 1}
      if(mes == 3){ this.totalOSmar += 1}
      if(mes == 4){ this.totalOSabr += 1}
      if(mes == 5){ this.totalOSmai += 1}
      if(mes == 6){ this.totalOSjun += 1}
      if(mes == 7){ this.totalOSjul += 1}
      if(mes == 8){ this.totalOSago += 1}
      if(mes == 9){ this.totalOSset += 1}
      if(mes == 10){ this.totalOSout += 1}
      if(mes == 11){ this.totalOSnov += 1}
      if(mes == 12){ this.totalOSdez += 1}

      if(os.status == "CONCLUIDA"){
        this.totalconcluida += 1
        if(mes == 1){ this.concluidaOSjan += 1}
        if(mes == 2){ this.concluidaOSfev += 1}
        if(mes == 3){ this.concluidaOSmar += 1}
        if(mes == 4){ this.concluidaOSabr += 1}
        if(mes == 5){ this.concluidaOSmai += 1}
        if(mes == 6){ this.concluidaOSjun += 1}
        if(mes == 7){ this.concluidaOSjul += 1}
        if(mes == 8){ this.concluidaOSago += 1}
        if(mes == 9){ this.concluidaOSset += 1}
        if(mes == 10){ this.concluidaOSout += 1}
        if(mes == 11){ this.concluidaOSnov += 1}
        if(mes == 12){ this.concluidaOSdez += 1}
      }
      if(os.status == "CONFERIDA"){
        this.totalconferida += 1
        if(mes == 1){ this.conferidaOSjan += 1}
        if(mes == 2){ this.conferidaOSfev += 1}
        if(mes == 3){ this.conferidaOSmar += 1}
        if(mes == 4){ this.conferidaOSabr += 1}
        if(mes == 5){ this.conferidaOSmai += 1}
        if(mes == 6){ this.conferidaOSjun += 1}
        if(mes == 7){ this.conferidaOSjul += 1}
        if(mes == 8){ this.conferidaOSago += 1}
        if(mes == 9){ this.conferidaOSset += 1}
        if(mes == 10){ this.conferidaOSout += 1}
        if(mes == 11){ this.conferidaOSnov += 1}
        if(mes == 12){ this.conferidaOSdez += 1}
      }
      if(os.status == "PENDENTE"){
        this.totalpendente += 1
        if(mes == 1){ this.pendenteOSjan += 1}
        if(mes == 2){ this.pendenteOSfev += 1}
        if(mes == 3){ this.pendenteOSmar += 1}
        if(mes == 4){ this.pendenteOSabr += 1}
        if(mes == 5){ this.pendenteOSmai += 1}
        if(mes == 6){ this.pendenteOSjun += 1}
        if(mes == 7){ this.pendenteOSjul += 1}
        if(mes == 8){ this.pendenteOSago += 1}
        if(mes == 9){ this.pendenteOSset += 1}
        if(mes == 10){ this.pendenteOSout += 1}
        if(mes == 11){ this.pendenteOSnov += 1}
        if(mes == 12){ this.pendenteOSdez += 1}
      }
      if(os.status == "EM_PAUSA"){
        this.totalempausa += 1
        if(mes == 1){ this.empausaOSjan += 1}
        if(mes == 2){ this.empausaOSfev += 1}
        if(mes == 3){ this.empausaOSmar += 1}
        if(mes == 4){ this.empausaOSabr += 1}
        if(mes == 5){ this.empausaOSmai += 1}
        if(mes == 6){ this.empausaOSjun += 1}
        if(mes == 7){ this.empausaOSjul += 1}
        if(mes == 8){ this.empausaOSago += 1}
        if(mes == 9){ this.empausaOSset += 1}
        if(mes == 10){ this.empausaOSout += 1}
        if(mes == 11){ this.empausaOSnov += 1}
        if(mes == 12){ this.empausaOSdez += 1}
      }

    });
  }

}
