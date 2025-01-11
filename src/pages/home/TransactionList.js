import { useFirestore } from "../../hooks/useFirestore"

// styles
import styles from "./Home.module.css"

const TransactionList = ({transactions}) => {
    const {deleteDocument, error} = useFirestore('transactions')
    console.log(error)
  return (
    <ul className={styles.transactions}>
        {transactions.map(transaction => (
            <li key={transaction.id}>
                <p className={styles.name}>{transaction.name}</p>
                <p className={styles.amount}>${transaction.amount}</p>
                <button onClick={() => deleteDocument(transaction.id)}>Delete</button>
            </li>
        ))}
    </ul>
  )
}

export default TransactionList