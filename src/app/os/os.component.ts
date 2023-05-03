import { sequence } from '@angular/animations';
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
  status = ''
  filtro:boolean = true
  spinner:boolean = false
  showtable:boolean = false
  showtelaosdetalhes:boolean = false
  tipo = ''
  clientes:any = []
  tecnicos:any = []
  showtelaos:boolean = false
  osdetalhes:any = []
  totalordens:any = []
  ano:Number = 0
  somadespesasdet = 0
  dados:any = []

  totaltotal = 0
  totaljan = 0
  totalfev = 0
  totalmar = 0
  totalabr = 0
  totalmai = 0
  totaljun = 0
  totaljul = 0
  totalago = 0
  totalset = 0
  totalout = 0
  totalnov = 0
  totaldez = 0

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


  Execute(ano:any, tipo:any){

    this.filtro = false
    this.spinner = true
    this.tipo = tipo
    this.ano = ano

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
          this.totalordens.push(element)
        });

      });

      num += 1000
    }

    setTimeout(() => this.showtable = true, 10000)
    setTimeout(() => this.calcular(), 10000)

    
  }

  calcular(){
    this.totalOS = 0
    this.totalOSjan = 0
    this.totalOSfev = 0
    this.totalOSmar = 0
    this.totalOSabr = 0
    this.totalOSmai = 0
    this.totalOSjun = 0
    this.totalOSjul = 0
    this.totalOSago = 0
    this.totalOSset = 0
    this.totalOSout = 0
    this.totalOSnov = 0
    this.totalOSdez = 0
  
    this.totalconcluida = 0
    this.concluidaOSjan = 0
    this.concluidaOSfev = 0
    this.concluidaOSmar = 0
    this.concluidaOSabr = 0
    this.concluidaOSmai = 0
    this.concluidaOSjun = 0
    this.concluidaOSjul = 0
    this.concluidaOSago = 0
    this.concluidaOSset = 0
    this.concluidaOSout = 0
    this.concluidaOSnov = 0
    this.concluidaOSdez = 0
  
    this.totalconferida = 0
    this.conferidaOSjan = 0
    this.conferidaOSfev = 0
    this.conferidaOSmar = 0
    this.conferidaOSabr = 0
    this.conferidaOSmai = 0
    this.conferidaOSjun = 0
    this.conferidaOSjul = 0
    this.conferidaOSago = 0
    this.conferidaOSset = 0
    this.conferidaOSout = 0
    this.conferidaOSnov = 0
    this.conferidaOSdez = 0
  
    this.totalpendente = 0
    this.pendenteOSjan = 0
    this.pendenteOSfev = 0
    this.pendenteOSmar = 0
    this.pendenteOSabr = 0
    this.pendenteOSmai = 0
    this.pendenteOSjun = 0
    this.pendenteOSjul = 0
    this.pendenteOSago = 0
    this.pendenteOSset = 0
    this.pendenteOSout = 0
    this.pendenteOSnov = 0
    this.pendenteOSdez = 0
  
    this.totalexecutando = 0
    this.executandoOSjan = 0
    this.executandoOSfev = 0
    this.executandoOSmar = 0
    this.executandoOSabr = 0
    this.executandoOSmai = 0
    this.executandoOSjun = 0
    this.executandoOSjul = 0
    this.executandoOSago = 0
    this.executandoOSset = 0
    this.executandoOSout = 0
    this.executandoOSnov = 0
    this.executandoOSdez = 0
  
    this.totalempausa = 0
    this.empausaOSjan = 0
    this.empausaOSfev = 0
    this.empausaOSmar = 0
    this.empausaOSabr = 0
    this.empausaOSmai = 0
    this.empausaOSjun = 0
    this.empausaOSjul = 0
    this.empausaOSago = 0
    this.empausaOSset = 0
    this.empausaOSout = 0
    this.empausaOSnov = 0
    this.empausaOSdez = 0

    

    this.totalordens.forEach((os:any) => {

      let tecnico = ''

      if(os.getTecnicoExecutor == null){
        tecnico = 'Nao tem Tecnico'
      }else{
        tecnico = os.getTecnicoExecutor.nome
      }
      
      let getContaCliente = { 
        nomeInformal: os.getContaCliente.nomeInformal,
        codigo: os.getContaCliente.codigo
      }

      let data = new Date (os.criadoEm)
      let dia = data.getDate()
      let mes = data.getMonth()+1
      let ano = data.getFullYear()

      let dataabertura = `${dia}/${mes}/${ano}`

      let datafim = new Date (os.fimExecucao)
      let diafim = datafim.getDate()
      let mesfim = datafim.getMonth()+1
      let anofim = datafim.getFullYear()

      let dataconclusao = `${diafim}/${mesfim}/${anofim}`


      this.ordens.push({
        dataabertura: dataabertura,
        dataconclusao: dataconclusao,
        criadoEm: os.criadoEm,
        fimExecucao: os.fimExecucao,
        descricaoSolicitacao: os.descricaoSolicitacao,
        descricaoSolucao: os.descricaoSolucao,
        nomeInformal: getContaCliente.nomeInformal,
        codigo: getContaCliente.codigo,
        tecnico: tecnico,
        id: os.id,
        sequencia: os.sequencia,
        status: os.status,
        valorTotal: os.valorTotal
      })
    });

    this.ordens.forEach((os: any) => {

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

    })
    console.log(this.ordens)
  }

  showos(status:any){

    this.totaltotal = 0
    this.totaljan = 0
    this.totalfev = 0
    this.totalmar = 0
    this.totalabr = 0
    this.totalmai = 0
    this.totaljun = 0
    this.totaljul = 0
    this.totalago = 0
    this.totalset = 0
    this.totalout = 0
    this.totalnov = 0
    this.totaldez = 0

    this.showtelaos = true
    this.showtable = false
    this.clientes = []  
    this.tecnicos = []
    this.dados = []
    this.status = status

    
    this.ordens.forEach((os:any) => {

      let data = new Date (os.criadoEm)
      let mes = data.getMonth()+1

      if(status == os.status){
        this.totaltotal += 1
        if(mes == 1){ this.totaljan += 1 }
        if(mes == 2){ this.totalfev += 1 }
        if(mes == 3){ this.totalmar += 1 }
        if(mes == 4){ this.totalabr += 1 }
        if(mes == 5){ this.totalmai += 1 }
        if(mes == 6){ this.totaljun += 1 }
        if(mes == 7){ this.totaljul += 1 }
        if(mes == 8){ this.totalago += 1 }
        if(mes == 9){ this.totalset += 1 }
        if(mes == 10){ this.totalout += 1 }
        if(mes == 11){ this.totalnov += 1 }
        if(mes == 12){ this.totaldez += 1 }
      }

      if(status == 'total'){
        this.totaltotal += 1
        if(mes == 1){ this.totaljan += 1 }
        if(mes == 2){ this.totalfev += 1 }
        if(mes == 3){ this.totalmar += 1 }
        if(mes == 4){ this.totalabr += 1 }
        if(mes == 5){ this.totalmai += 1 }
        if(mes == 6){ this.totaljun += 1 }
        if(mes == 7){ this.totaljul += 1 }
        if(mes == 8){ this.totalago += 1 }
        if(mes == 9){ this.totalset += 1 }
        if(mes == 10){ this.totalout += 1 }
        if(mes == 11){ this.totalnov += 1 }
        if(mes == 12){ this.totaldez += 1 }
      }

      if(status == 'total' && this.tipo == 'Clientes'){
        if(this.clientes.find((dados:any) => dados.cod == os.codigo)){
          if(mes == 1){ this.clientes.find((dados:any) => dados.cod == os.codigo).jan += 1 }
          if(mes == 2){ this.clientes.find((dados:any) => dados.cod == os.codigo).fev += 1 }
          if(mes == 3){ this.clientes.find((dados:any) => dados.cod == os.codigo).mar += 1 }
          if(mes == 4){ this.clientes.find((dados:any) => dados.cod == os.codigo).abr += 1 }
          if(mes == 5){ this.clientes.find((dados:any) => dados.cod == os.codigo).mai += 1 }
          if(mes == 6){ this.clientes.find((dados:any) => dados.cod == os.codigo).jun += 1 }
          if(mes == 7){ this.clientes.find((dados:any) => dados.cod == os.codigo).jul += 1 }
          if(mes == 8){ this.clientes.find((dados:any) => dados.cod == os.codigo).ago += 1 }
          if(mes == 9){ this.clientes.find((dados:any) => dados.cod == os.codigo).set += 1 }
          if(mes == 10){ this.clientes.find((dados:any) => dados.cod == os.codigo).out += 1 }
          if(mes == 11){ this.clientes.find((dados:any) => dados.cod == os.codigo).nov += 1 }
          if(mes == 12){ this.clientes.find((dados:any) => dados.cod == os.codigo).dez += 1 }
          this.clientes.find((dados:any) => dados.cod == os.codigo).total += 1
        }else{
          this.clientes.push({
            cod: os.codigo,
            nome: os.nomeInformal,
            total: Number(0),
            jan: Number(0),
            fev: Number(0),
            mar: Number(0),
            abr: Number(0),
            mai: Number(0),
            jun: Number(0),
            jul: Number(0),
            ago: Number(0),
            set: Number(0),
            out: Number(0),
            nov: Number(0),
            dez: Number(0),
          })
          if(mes == 1){ this.clientes.find((dados:any) => dados.cod == os.codigo).jan += 1 }
          if(mes == 2){ this.clientes.find((dados:any) => dados.cod == os.codigo).fev += 1 }
          if(mes == 3){ this.clientes.find((dados:any) => dados.cod == os.codigo).mar += 1 }
          if(mes == 4){ this.clientes.find((dados:any) => dados.cod == os.codigo).abr += 1 }
          if(mes == 5){ this.clientes.find((dados:any) => dados.cod == os.codigo).mai += 1 }
          if(mes == 6){ this.clientes.find((dados:any) => dados.cod == os.codigo).jun += 1 }
          if(mes == 7){ this.clientes.find((dados:any) => dados.cod == os.codigo).jul += 1 }
          if(mes == 8){ this.clientes.find((dados:any) => dados.cod == os.codigo).ago += 1 }
          if(mes == 9){ this.clientes.find((dados:any) => dados.cod == os.codigo).set += 1 }
          if(mes == 10){ this.clientes.find((dados:any) => dados.cod == os.codigo).out += 1 }
          if(mes == 11){ this.clientes.find((dados:any) => dados.cod == os.codigo).nov += 1 }
          if(mes == 12){ this.clientes.find((dados:any) => dados.cod == os.codigo).dez += 1 }
          this.clientes.find((dados:any) => dados.cod == os.codigo).total += 1
        }
        this.dados = this.clientes
      }

      if(status == 'total' && this.tipo == 'Tecnicos'){
        if(this.tecnicos.find((dados:any) => dados.nome == os.tecnico)){
          if(mes == 1){ this.tecnicos.find((dados:any) => dados.nome == os.tecnico).jan += 1 }
          if(mes == 2){ this.tecnicos.find((dados:any) => dados.nome == os.tecnico).fev += 1 }
          if(mes == 3){ this.tecnicos.find((dados:any) => dados.nome == os.tecnico).mar += 1 }
          if(mes == 4){ this.tecnicos.find((dados:any) => dados.nome == os.tecnico).abr += 1 }
          if(mes == 5){ this.tecnicos.find((dados:any) => dados.nome == os.tecnico).mai += 1 }
          if(mes == 6){ this.tecnicos.find((dados:any) => dados.nome == os.tecnico).jun += 1 }
          if(mes == 7){ this.tecnicos.find((dados:any) => dados.nome == os.tecnico).jul += 1 }
          if(mes == 8){ this.tecnicos.find((dados:any) => dados.nome == os.tecnico).ago += 1 }
          if(mes == 9){ this.tecnicos.find((dados:any) => dados.nome == os.tecnico).set += 1 }
          if(mes == 10){ this.tecnicos.find((dados:any) => dados.nome == os.tecnico).out += 1 }
          if(mes == 11){ this.tecnicos.find((dados:any) => dados.nome == os.tecnico).nov += 1 }
          if(mes == 12){ this.tecnicos.find((dados:any) => dados.nome == os.tecnico).dez += 1 }
          this.tecnicos.find((dados:any) => dados.nome == os.tecnico).total += 1
        }else{
          this.tecnicos.push({
            nome: os.tecnico,
            total: Number(0),
            jan: Number(0),
            fev: Number(0),
            mar: Number(0),
            abr: Number(0),
            mai: Number(0),
            jun: Number(0),
            jul: Number(0),
            ago: Number(0),
            set: Number(0),
            out: Number(0),
            nov: Number(0),
            dez: Number(0),
          })
          if(mes == 1){ this.tecnicos.find((dados:any) => dados.nome == os.tecnico).jan += 1 }
          if(mes == 2){ this.tecnicos.find((dados:any) => dados.nome == os.tecnico).fev += 1 }
          if(mes == 3){ this.tecnicos.find((dados:any) => dados.nome == os.tecnico).mar += 1 }
          if(mes == 4){ this.tecnicos.find((dados:any) => dados.nome == os.tecnico).abr += 1 }
          if(mes == 5){ this.tecnicos.find((dados:any) => dados.nome == os.tecnico).mai += 1 }
          if(mes == 6){ this.tecnicos.find((dados:any) => dados.nome == os.tecnico).jun += 1 }
          if(mes == 7){ this.tecnicos.find((dados:any) => dados.nome == os.tecnico).jul += 1 }
          if(mes == 8){ this.tecnicos.find((dados:any) => dados.nome == os.tecnico).ago += 1 }
          if(mes == 9){ this.tecnicos.find((dados:any) => dados.nome == os.tecnico).set += 1 }
          if(mes == 10){ this.tecnicos.find((dados:any) => dados.nome == os.tecnico).out += 1 }
          if(mes == 11){ this.tecnicos.find((dados:any) => dados.nome == os.tecnico).nov += 1 }
          if(mes == 12){ this.tecnicos.find((dados:any) => dados.nome == os.tecnico).dez += 1 }
          this.tecnicos.find((dados:any) => dados.nome == os.tecnico).total += 1
        }
        this.dados = this.tecnicos
      }
      
      if(status == os.status){
        if(this.tipo == 'Tecnicos'){
            if(this.tecnicos.find((dados:any) => dados.nome == os.tecnico)){
              if(mes == 1){ this.tecnicos.find((dados:any) => dados.nome == os.tecnico).jan += 1 }
              if(mes == 2){ this.tecnicos.find((dados:any) => dados.nome == os.tecnico).fev += 1 }
              if(mes == 3){ this.tecnicos.find((dados:any) => dados.nome == os.tecnico).mar += 1 }
              if(mes == 4){ this.tecnicos.find((dados:any) => dados.nome == os.tecnico).abr += 1 }
              if(mes == 5){ this.tecnicos.find((dados:any) => dados.nome == os.tecnico).mai += 1 }
              if(mes == 6){ this.tecnicos.find((dados:any) => dados.nome == os.tecnico).jun += 1 }
              if(mes == 7){ this.tecnicos.find((dados:any) => dados.nome == os.tecnico).jul += 1 }
              if(mes == 8){ this.tecnicos.find((dados:any) => dados.nome == os.tecnico).ago += 1 }
              if(mes == 9){ this.tecnicos.find((dados:any) => dados.nome == os.tecnico).set += 1 }
              if(mes == 10){ this.tecnicos.find((dados:any) => dados.nome == os.tecnico).out += 1 }
              if(mes == 11){ this.tecnicos.find((dados:any) => dados.nome == os.tecnico).nov += 1 }
              if(mes == 12){ this.tecnicos.find((dados:any) => dados.nome == os.tecnico).dez += 1 }
              this.tecnicos.find((dados:any) => dados.nome == os.tecnico).total += 1
            }else{
              this.tecnicos.push({
                nome: os.tecnico,
                total: Number(0),
                jan: Number(0),
                fev: Number(0),
                mar: Number(0),
                abr: Number(0),
                mai: Number(0),
                jun: Number(0),
                jul: Number(0),
                ago: Number(0),
                set: Number(0),
                out: Number(0),
                nov: Number(0),
                dez: Number(0),
              })
              if(mes == 1){ this.tecnicos.find((dados:any) => dados.nome == os.tecnico).jan += 1 }
              if(mes == 2){ this.tecnicos.find((dados:any) => dados.nome == os.tecnico).fev += 1 }
              if(mes == 3){ this.tecnicos.find((dados:any) => dados.nome == os.tecnico).mar += 1 }
              if(mes == 4){ this.tecnicos.find((dados:any) => dados.nome == os.tecnico).abr += 1 }
              if(mes == 5){ this.tecnicos.find((dados:any) => dados.nome == os.tecnico).mai += 1 }
              if(mes == 6){ this.tecnicos.find((dados:any) => dados.nome == os.tecnico).jun += 1 }
              if(mes == 7){ this.tecnicos.find((dados:any) => dados.nome == os.tecnico).jul += 1 }
              if(mes == 8){ this.tecnicos.find((dados:any) => dados.nome == os.tecnico).ago += 1 }
              if(mes == 9){ this.tecnicos.find((dados:any) => dados.nome == os.tecnico).set += 1 }
              if(mes == 10){ this.tecnicos.find((dados:any) => dados.nome == os.tecnico).out += 1 }
              if(mes == 11){ this.tecnicos.find((dados:any) => dados.nome == os.tecnico).nov += 1 }
              if(mes == 12){ this.tecnicos.find((dados:any) => dados.nome == os.tecnico).dez += 1 }
              this.tecnicos.find((dados:any) => dados.nome == os.tecnico).total += 1
            }
          this.dados = this.tecnicos
        }
        if(this.tipo == 'Clientes'){
            if(this.clientes.find((dados:any) => dados.cod == os.codigo)){
              if(mes == 1){ this.clientes.find((dados:any) => dados.cod == os.codigo).jan += 1 }
              if(mes == 2){ this.clientes.find((dados:any) => dados.cod == os.codigo).fev += 1 }
              if(mes == 3){ this.clientes.find((dados:any) => dados.cod == os.codigo).mar += 1 }
              if(mes == 4){ this.clientes.find((dados:any) => dados.cod == os.codigo).abr += 1 }
              if(mes == 5){ this.clientes.find((dados:any) => dados.cod == os.codigo).mai += 1 }
              if(mes == 6){ this.clientes.find((dados:any) => dados.cod == os.codigo).jun += 1 }
              if(mes == 7){ this.clientes.find((dados:any) => dados.cod == os.codigo).jul += 1 }
              if(mes == 8){ this.clientes.find((dados:any) => dados.cod == os.codigo).ago += 1 }
              if(mes == 9){ this.clientes.find((dados:any) => dados.cod == os.codigo).set += 1 }
              if(mes == 10){ this.clientes.find((dados:any) => dados.cod == os.codigo).out += 1 }
              if(mes == 11){ this.clientes.find((dados:any) => dados.cod == os.codigo).nov += 1 }
              if(mes == 12){ this.clientes.find((dados:any) => dados.cod == os.codigo).dez += 1 }
              this.clientes.find((dados:any) => dados.cod == os.codigo).total += 1
            }else{
              this.clientes.push({
                cod: os.codigo,
                nome: os.nomeInformal,
                total: Number(0),
                jan: Number(0),
                fev: Number(0),
                mar: Number(0),
                abr: Number(0),
                mai: Number(0),
                jun: Number(0),
                jul: Number(0),
                ago: Number(0),
                set: Number(0),
                out: Number(0),
                nov: Number(0),
                dez: Number(0),
              })
              if(mes == 1){ this.clientes.find((dados:any) => dados.cod == os.codigo).jan += 1 }
              if(mes == 2){ this.clientes.find((dados:any) => dados.cod == os.codigo).fev += 1 }
              if(mes == 3){ this.clientes.find((dados:any) => dados.cod == os.codigo).mar += 1 }
              if(mes == 4){ this.clientes.find((dados:any) => dados.cod == os.codigo).abr += 1 }
              if(mes == 5){ this.clientes.find((dados:any) => dados.cod == os.codigo).mai += 1 }
              if(mes == 6){ this.clientes.find((dados:any) => dados.cod == os.codigo).jun += 1 }
              if(mes == 7){ this.clientes.find((dados:any) => dados.cod == os.codigo).jul += 1 }
              if(mes == 8){ this.clientes.find((dados:any) => dados.cod == os.codigo).ago += 1 }
              if(mes == 9){ this.clientes.find((dados:any) => dados.cod == os.codigo).set += 1 }
              if(mes == 10){ this.clientes.find((dados:any) => dados.cod == os.codigo).out += 1 }
              if(mes == 11){ this.clientes.find((dados:any) => dados.cod == os.codigo).nov += 1 }
              if(mes == 12){ this.clientes.find((dados:any) => dados.cod == os.codigo).dez += 1 }
              this.clientes.find((dados:any) => dados.cod == os.codigo).total += 1
            }
          this.dados = this.clientes
        }
      }
      
    });

  }

  backos(){
    this.showtelaos = false
    this.showtable = true
    this.status = ''
  }

  orderos(info:any){
    if(info == 'nome'){
      let soma = (a:any, b:any) => {
        if (a.nome < b.nome) {
          return -1;
        }
        if (a.nome > b.nome) {
          return 1;
        }
        // a must be equal to b
        return 0;
      };
      this.clientes.sort(soma)
      this.tecnicos.sort(soma)
    }
    if(info == 'total'){
      let soma = (a:any, b:any) => {
        if (a.total > b.total) {
          return -1;
        }
        if (a.total < b.total) {
          return 1;
        }
        // a must be equal to b
        return 0;
      };
      this.clientes.sort(soma)
      this.tecnicos.sort(soma)
    }
    if(info == 'jan'){
      let soma = (a:any, b:any) => {
        if (a.jan > b.jan) {
          return -1;
        }
        if (a.jan < b.jan) {
          return 1;
        }
        // a must be equal to b
        return 0;
      };
      this.clientes.sort(soma)
      this.tecnicos.sort(soma)
    }
    if(info == 'fev'){
      let soma = (a:any, b:any) => {
        if (a.fev > b.fev) {
          return -1;
        }
        if (a.fev < b.fev) {
          return 1;
        }
        // a must be equal to b
        return 0;
      };
      this.clientes.sort(soma)
      this.tecnicos.sort(soma)
    }
    if(info == 'mar'){
      let soma = (a:any, b:any) => {
        if (a.mar > b.mar) {
          return -1;
        }
        if (a.mar < b.mar) {
          return 1;
        }
        // a must be equal to b
        return 0;
      };
      this.clientes.sort(soma)
      this.tecnicos.sort(soma)
    }
    if(info == 'abr'){
      let soma = (a:any, b:any) => {
        if (a.abr > b.abr) {
          return -1;
        }
        if (a.abr < b.abr) {
          return 1;
        }
        // a must be equal to b
        return 0;
      };
      this.clientes.sort(soma)
      this.tecnicos.sort(soma)
    }
    if(info == 'mai'){
      let soma = (a:any, b:any) => {
        if (a.mai > b.mai) {
          return -1;
        }
        if (a.mai < b.mai) {
          return 1;
        }
        // a must be equal to b
        return 0;
      };
      this.clientes.sort(soma)
      this.tecnicos.sort(soma)
    }
    if(info == 'jun'){
      let soma = (a:any, b:any) => {
        if (a.jun > b.jun) {
          return -1;
        }
        if (a.jun < b.jun) {
          return 1;
        }
        // a must be equal to b
        return 0;
      };
      this.clientes.sort(soma)
      this.tecnicos.sort(soma)
    }
    if(info == 'jul'){
      let soma = (a:any, b:any) => {
        if (a.jul > b.jul) {
          return -1;
        }
        if (a.jul < b.jul) {
          return 1;
        }
        // a must be equal to b
        return 0;
      };
      this.clientes.sort(soma)
      this.tecnicos.sort(soma)
    }
    if(info == 'ago'){
      let soma = (a:any, b:any) => {
        if (a.ago > b.ago) {
          return -1;
        }
        if (a.ago < b.ago) {
          return 1;
        }
        // a must be equal to b
        return 0;
      };
      this.clientes.sort(soma)
      this.tecnicos.sort(soma)
    }
    if(info == 'set'){
      let soma = (a:any, b:any) => {
        if (a.set > b.set) {
          return -1;
        }
        if (a.set < b.set) {
          return 1;
        }
        // a must be equal to b
        return 0;
      };
      this.clientes.sort(soma)
      this.tecnicos.sort(soma)
    }
    if(info == 'out'){
      let soma = (a:any, b:any) => {
        if (a.out > b.out) {
          return -1;
        }
        if (a.out < b.out) {
          return 1;
        }
        // a must be equal to b
        return 0;
      };
      this.clientes.sort(soma)
      this.tecnicos.sort(soma)
    }
    if(info == 'nov'){
      let soma = (a:any, b:any) => {
        if (a.nov > b.nov) {
          return -1;
        }
        if (a.nov < b.nov) {
          return 1;
        }
        // a must be equal to b
        return 0;
      };
      this.clientes.sort(soma)
      this.tecnicos.sort(soma)
    }
    if(info == 'dez'){
      let soma = (a:any, b:any) => {
        if (a.dez > b.dez) {
          return -1;
        }
        if (a.dez < b.dez) {
          return 1;
        }
        // a must be equal to b
        return 0;
      };
      this.clientes.sort(soma)
      this.tecnicos.sort(soma)
    }

  }

  orderosdetalhes(info:any){
    if(info == 'abertura'){
      let soma = (a:any, b:any) => {
        if (a.criadoEm < b.criadoEm) {
          return -1;
        }
        if (a.criadoEm > b.criadoEm) {
          return 1;
        }
        // a must be equal to b
        return 0;
      };
      this.osdetalhes.sort(soma)
    }
    if(info == 'conclusao'){
      let soma = (a:any, b:any) => {
        if (a.fimExecucao < b.fimExecucao) {
          return -1;
        }
        if (a.fimExecucao > b.fimExecucao) {
          return 1;
        }
        // a must be equal to b
        return 0;
      };
      this.osdetalhes.sort(soma)
    }
    if(info == 'descricaoSolicitacao'){
      let soma = (a:any, b:any) => {
        if (a.descricaoSolicitacao < b.descricaoSolicitacao) {
          return -1;
        }
        if (a.descricaoSolicitacao > b.descricaoSolicitacao) {
          return 1;
        }
        // a must be equal to b
        return 0;
      };
      this.osdetalhes.sort(soma)
    }
    if(info == 'descricaoSolucao'){
      let soma = (a:any, b:any) => {
        if (a.descricaoSolucao < b.descricaoSolucao) {
          return -1;
        }
        if (a.descricaoSolucao > b.descricaoSolucao) {
          return 1;
        }
        // a must be equal to b
        return 0;
      };
      this.osdetalhes.sort(soma)
    }
    if(info == 'nomeInformal'){
      let soma = (a:any, b:any) => {
        if (a.nomeInformal < b.nomeInformal) {
          return -1;
        }
        if (a.nomeInformal > b.nomeInformal) {
          return 1;
        }
        // a must be equal to b
        return 0;
      };
      this.osdetalhes.sort(soma)
    }
    if(info == 'codigo'){
      let soma = (a:any, b:any) => {
        if (a.codigo < b.codigo) {
          return -1;
        }
        if (a.codigo > b.codigo) {
          return 1;
        }
        // a must be equal to b
        return 0;
      };
      this.osdetalhes.sort(soma)
    }
    if(info == 'tecnico'){
      let soma = (a:any, b:any) => {
        if (a.tecnico < b.tecnico) {
          return -1;
        }
        if (a.tecnico > b.tecnico) {
          return 1;
        }
        // a must be equal to b
        return 0;
      };
      this.osdetalhes.sort(soma)
    }
    if(info == 'id'){
      let soma = (a:any, b:any) => {
        if (a.id < b.id) {
          return -1;
        }
        if (a.id > b.id) {
          return 1;
        }
        // a must be equal to b
        return 0;
      };
      this.osdetalhes.sort(soma)
    }
    if(info == 'sequencia'){
      let soma = (a:any, b:any) => {
        if (a.sequencia < b.sequencia) {
          return -1;
        }
        if (a.sequencia > b.sequencia) {
          return 1;
        }
        // a must be equal to b
        return 0;
      };
      this.osdetalhes.sort(soma)
    }
    if(info == 'status'){
      let soma = (a:any, b:any) => {
        if (a.status < b.status) {
          return -1;
        }
        if (a.status > b.status) {
          return 1;
        }
        // a must be equal to b
        return 0;
      };
      this.osdetalhes.sort(soma)
    }
    if(info == 'valorTotal'){
      let soma = (a:any, b:any) => {
        if (a.valorTotal < b.valorTotal) {
          return -1;
        }
        if (a.valorTotal > b.valorTotal) {
          return 1;
        }
        // a must be equal to b
        return 0;
      };
      this.osdetalhes.sort(soma)
    }
  }

  filtarDespesas(event: any, tipo:any){ 
    let values = event.target.value.toLowerCase();
    this.clientes = []
    this.tecnicos = []
    
      if(tipo == 'cod'){
        this.dados.forEach((element:any) => {
          let nome = element.cod.toLowerCase();

          if(nome.indexOf(values) >= 0){
            this.clientes.push(element)
          }

        })
      }

      if(tipo == 'nome'){
        this.dados.forEach((element:any) => {
          let nome = element.nome.toLowerCase();

          if(nome.indexOf(values) >= 0){
            this.clientes.push(element)
          }

        })
      }

      if(tipo == 'tecnico'){
        this.dados.forEach((element:any) => {
          let nome = element.nome.toLowerCase();

          if(nome.indexOf(values) >= 0){
            this.tecnicos.push(element)
          }

        })
      }
    }

  showosdetalhestecnicos(tecnico:any, mesescolhido:any){

    this.showtelaos = false
    this.showtelaosdetalhes = true
    this.osdetalhes = []
    this.dados = []

    this.ordens.forEach((os:any) => {

      let data = new Date (os.criadoEm)
      let mes = data.getMonth()+1

      if(tecnico == os.tecnico){
        if(mesescolhido == mes && this.status == os.status){
          this.osdetalhes.push(os)
        }
      }

      if(tecnico == os.tecnico){
        if(mesescolhido == 'total' && this.status == os.status){
          this.osdetalhes.push(os)
        }
      }

      if(tecnico == os.tecnico){
        if(mesescolhido == 'total' && this.status == 'total'){
          this.osdetalhes.push(os)
        }
      }

      if(tecnico == os.tecnico){
        if(mesescolhido == mes && this.status == 'total'){
          this.osdetalhes.push(os)
        }
      }

      if(tecnico == 'total'){
        if(mesescolhido == mes && this.status == 'total'){
          this.osdetalhes.push(os)
        }
        if(mesescolhido == mes && this.status == os.status){
          this.osdetalhes.push(os)
        }
        if(mesescolhido == 'total' && this.status == os.status){
          this.osdetalhes.push(os)
        }
        if(mesescolhido == 'total' && this.status == 'total'){
          this.osdetalhes.push(os)
        }
      }

    })

    this.dados = this.osdetalhes
  }

  backtelaos(){
    
    this.showtelaos = true
    this.showtelaosdetalhes = false
  }

  showdetalhesclientes(codcliente:any, mesescolhido:any){
    
    this.showtelaos = false
    this.showtelaosdetalhes = true
    this.osdetalhes = []
    this.dados = []

    this.ordens.forEach((os:any) => {

      let data = new Date (os.criadoEm)
      let mes = data.getMonth()+1

      //depende do status

      if(codcliente == os.codigo){
        if(mesescolhido == mes && this.status == os.status){

          this.osdetalhes.push({
            dataabertura: os.dataabertura,
            dataconclusao: os.dataconclusao,
            criadoEm: os.criadoEm,
            fimExecucao: os.fimExecucao,
            descricaoSolicitacao: os.descricaoSolicitacao,
            descricaoSolucao: os.descricaoSolucao,
            nomeInformal: os.nomeInformal,
            codigo: os.codigo,
            tecnico: os.tecnico,
            id: os.id,
            sequencia: os.sequencia,
            status: os.status,
            valorTotal: os.valorTotal
          })
        }
      }

      if(codcliente == os.codigo){
        if(mesescolhido == 'total' && this.status == os.status){

          this.osdetalhes.push({
            dataabertura: os.dataabertura,
            dataconclusao: os.dataconclusao,
            criadoEm: os.criadoEm,
            fimExecucao: os.fimExecucao,
            descricaoSolicitacao: os.descricaoSolicitacao,
            descricaoSolucao: os.descricaoSolucao,
            nomeInformal: os.nomeInformal,
            codigo: os.codigo,
            tecnico: os.tecnico,
            id: os.id,
            sequencia: os.sequencia,
            status: os.status,
            valorTotal: os.valorTotal
          })
        }
      }

      // status == 'total

      if(codcliente == os.codigo){
        if(mesescolhido == mes && this.status == 'total'){

          this.osdetalhes.push({
            dataabertura: os.dataabertura,
            dataconclusao: os.dataconclusao,
            criadoEm: os.criadoEm,
            fimExecucao: os.fimExecucao,
            descricaoSolicitacao: os.descricaoSolicitacao,
            descricaoSolucao: os.descricaoSolucao,
            nomeInformal: os.nomeInformal,
            codigo: os.codigo,
            tecnico: os.tecnico,
            id: os.id,
            sequencia: os.sequencia,
            status: os.status,
            valorTotal: os.valorTotal
          })
        }
      }

      if(codcliente == os.codigo){
        if(mesescolhido == 'total' && this.status == 'total'){

          this.osdetalhes.push({
            dataabertura: os.dataabertura,
            dataconclusao: os.dataconclusao,
            criadoEm: os.criadoEm,
            fimExecucao: os.fimExecucao,
            descricaoSolicitacao: os.descricaoSolicitacao,
            descricaoSolucao: os.descricaoSolucao,
            nomeInformal: os.nomeInformal,
            codigo: os.codigo,
            tecnico: os.tecnico,
            id: os.id,
            sequencia: os.sequencia,
            status: os.status,
            valorTotal: os.valorTotal
          })
        }
      }

      if(codcliente == 'total'){
        if(mesescolhido == 'total' && this.status == 'total'){

          this.osdetalhes.push({
            dataabertura: os.dataabertura,
            dataconclusao: os.dataconclusao,
            criadoEm: os.criadoEm,
            fimExecucao: os.fimExecucao,
            descricaoSolicitacao: os.descricaoSolicitacao,
            descricaoSolucao: os.descricaoSolucao,
            nomeInformal: os.nomeInformal,
            codigo: os.codigo,
            tecnico: os.tecnico,
            id: os.id,
            sequencia: os.sequencia,
            status: os.status,
            valorTotal: os.valorTotal
          })
        }
        if(mesescolhido == mes && this.status == 'total'){

          this.osdetalhes.push({
            dataabertura: os.dataabertura,
            dataconclusao: os.dataconclusao,
            criadoEm: os.criadoEm,
            fimExecucao: os.fimExecucao,
            descricaoSolicitacao: os.descricaoSolicitacao,
            descricaoSolucao: os.descricaoSolucao,
            nomeInformal: os.nomeInformal,
            codigo: os.codigo,
            tecnico: os.tecnico,
            id: os.id,
            sequencia: os.sequencia,
            status: os.status,
            valorTotal: os.valorTotal
          })
        }
        if(mesescolhido == 'total' && this.status == os.status){

          this.osdetalhes.push({
            dataabertura: os.dataabertura,
            dataconclusao: os.dataconclusao,
            criadoEm: os.criadoEm,
            fimExecucao: os.fimExecucao,
            descricaoSolicitacao: os.descricaoSolicitacao,
            descricaoSolucao: os.descricaoSolucao,
            nomeInformal: os.nomeInformal,
            codigo: os.codigo,
            tecnico: os.tecnico,
            id: os.id,
            sequencia: os.sequencia,
            status: os.status,
            valorTotal: os.valorTotal
          })
        }
        if(mesescolhido == mes && this.status == os.status){

          this.osdetalhes.push({
            dataabertura: os.dataabertura,
            dataconclusao: os.dataconclusao,
            criadoEm: os.criadoEm,
            fimExecucao: os.fimExecucao,
            descricaoSolicitacao: os.descricaoSolicitacao,
            descricaoSolucao: os.descricaoSolucao,
            nomeInformal: os.nomeInformal,
            codigo: os.codigo,
            tecnico: os.tecnico,
            id: os.id,
            sequencia: os.sequencia,
            status: os.status,
            valorTotal: os.valorTotal
          })
        }
      }

    })

    this.dados = this.osdetalhes
  }
  
}
