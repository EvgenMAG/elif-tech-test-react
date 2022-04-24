import React, { useState, useEffect, useSyncExternalStore } from 'react';

// import { v4 as uuidv4 } from 'uuid'

import { useDispatch, useSelector } from 'react-redux';
import { Operations, Selectors } from '../../redux/contacts';
import Loading from '../Loading/Loader';

import s from './CreateBankForm.module.css';
import basket from '../../img/basket3.png'
import edit from '../../img/edit.png'




export default function CreateBankForm() {
  const [bank, setBank] = useState({ name: '', interestRate: '', maxLoan: '' , minDownPay: '',loanTerm:'' });
  // const [store, setStore] = useState([]);

   
  const { name, interestRate, maxLoan, minDownPay, loanTerm} = bank;

  console.log(bank);

  // useEffect(()=>{
  // const saved = localStorage.getItem("bank");
  // const dataFromLocalStorage = JSON.parse(saved);
  
  // setStore((prevState)=> !dataFromLocalStorage? [...prevState] : [...dataFromLocalStorage])
 
  // },[localStorage.getItem("bank")])


  const initContacts = useDispatch();
    useEffect(() => {
      initContacts(Operations.getContacts());
    }, [initContacts]);

   
    
    const banksList = useSelector(Selectors.getAllContacts);
    console.log(banksList);

  


  const handleChange = e => {
    const { name, value } = e.currentTarget;
    switch (name) {
      case 'name':
        setBank(prevState => ({ ...prevState, [name]: value }));
        break;
      case 'interestRate':
        setBank(prevState => ({ ...prevState, [name]: value }));
        break;
      case 'maxLoan':
        setBank(prevState => ({ ...prevState, [name]: value }));
        break;
      case 'minDownPay':
        setBank(prevState => ({ ...prevState, [name]: value }));
        break;
      case 'loanTerm':
        setBank(prevState => ({ ...prevState, [name]: value }));
        break;
      default:
        console.log("There aren't such data");
    }
  };

  const addContact = useDispatch();
  const updateContact = useDispatch();
  
  const handleSubmit = e => {
    e.preventDefault();
    console.log(bank);
    console.log(!banksList.length);
    if(banksList.length===0) {
      addContact(Operations.addContact(bank))
      reset();
    }else{
      banksList.find((item)=> {
        if(item._id === bank._id){
         updateContact(Operations.updateContact(item._id, { name, interestRate, maxLoan, minDownPay, loanTerm} ))
         reset();
        }else{
          addContact(Operations.addContact(bank))
          reset();
        }
      })
      
    }
    
 
    
    
    
    // const userId = !user.id? { name, interestRate, maxLoan, minDownPay, loanTerm }:
    // { name, interestRate, maxLoan, minDownPay, loanTerm }
    // const editedList = store.filter((item)=> item.id !== userId.id) 
   
    // localStorage.setItem("bank", JSON.stringify([...editedList, userId]))
    // addContact(Operations.addContact(bank))
    // reset();
  };

  const reset = () => {
    setBank({ name: '', interestRate: '', maxLoan: '' , minDownPay: '',loanTerm:'' });
   
  };

  const deleteContact = useDispatch();
  const deleteItem =id=>{
  deleteContact(Operations.deleteContact(id))
  
  }

  // const updateContact = useDispatch();
  // updateContact(Operations.updateContact(id))
  const editItem = id => {
    const  item = banksList.find((item)=> item._id === id)
    setBank(() => item )
    
  }



  let disable = true;
  if (name && interestRate && maxLoan && minDownPay && loanTerm ) {
    disable = false;
  }

  return (
    <div className={s.Container}>
    <div className={s.formContainer}>
      <h1 className={s.title}>Bank details</h1>

      <form onSubmit={handleSubmit} className={s.form} autoComplete="off">
        <label className={s.label}>
        Bank name
          <input type="text" name="name" placeholder='MonoBank' value={name} onChange={handleChange} />
        </label>

        <label className={s.label}>
        Interest rate 
          <input
            type="number"
            name="interestRate"
            placeholder='5 %'
            min={0}
            max = {25}
            value={interestRate}
            onChange={handleChange}
          />

        </label>

        <label className={s.label}>
        Maximum loan
          <input
            type="number"
            name="maxLoan"
            placeholder= "100000000 $"
            min={0}
            value={maxLoan}
            onChange={handleChange}
          />
        </label>

        <label className={s.label}>
        Minimum down payment
          <input
            type="number"
            name="minDownPay"
            placeholder= "10 %"
            min={0}
            max = {50}
            value={minDownPay}
            onChange={handleChange}
          />
        </label>

        <label className={s.label}>
        Loan term
          <input
            type="number"
            name="loanTerm"
            placeholder= "36 months"
            min={0}
            max = {120}
            value={loanTerm}
            onChange={handleChange}
          />
        </label>
        <button type="submit" disabled={disable} className={s.btnCreate}>Create</button>
      </form>
    </div>
    <div className={s.banksContainer}>

    { banksList.length > 0 && 
        <div >
          <h1 className={s.title}>Bank List</h1>
          <table>
          <thead>
               <tr>
      <th className={s.tablHead}>Bank</th>
      <th className={s.tablHead}>Int.Rate</th>
      <th className={s.tablHead}>Max.Loan</th>
      <th className={s.tablHead}>Min.Pay</th>
      <th className={s.tablHead}>Loan Term</th>
              </tr>
         </thead>
         <tbody> 
    {  banksList.map((item)=>
    <tr key={item._id} >
    <td className={s.bankName}>{item.name}</td>
    <td className={s.tabData}>{item.interestRate}</td>
    <td className={s.tabData}>{item.maxLoan}</td>
    <td className={s.tabData}>{item.minDownPay}</td>
    <td className={s.tabData}>{item.loanTerm}</td>
    <td  onClick={()=> deleteItem(item._id)} >
      <img className = {s.deleteBtn} src={basket}></img>  
     </td>
    <td  onClick={()=> editItem(item._id)} >
    <img className = {s.deleteBtn} src={edit}></img>
    </td>
  </tr>        
        )}
  </tbody>     
          </table>
      </div>
       } 
    </div>
    </div>
    

    
  );
}
