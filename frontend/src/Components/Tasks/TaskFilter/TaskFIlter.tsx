import { FormEvent } from 'react'
import { QueryParams } from '../../../types/types'
import { Input } from '../../Forms/Input/Input'
import { Select } from '../../Forms/Select/Select'
import { Button } from '../../Buttons/Button/Button'
import styles from './TaskFIlter.module.css'

type TaskFilterProps = {
  getTasks: (filters: QueryParams) => Promise<void>
}

export const TaskFilter = ({ getTasks }: TaskFilterProps) => {
  const submitFilterHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const filters: QueryParams = {
      status: formData.get('estado') as string,
      dateBefore: formData.get('fechaAntesDe') as string,
      dateAfter: formData.get('fechaDespuesDe') as string,
      search: formData.get('filtro') as string,
    }
    await getTasks(filters)
  }
  return (
    <form onSubmit={submitFilterHandler}>
      <div className={styles.form}>
        <div className={styles.filters}>
          <Input label={'Filtro'} type={'text'} name={'filtro'} placeholder={'Filtro'} />
          <Select label={'Estado'} name={'estado'}>
            <optgroup label={'Estado'}>
              <option value={''}>Todos</option>
              <option value={'pending'}>Pendiente</option>
              <option value={'in_progress'}>En Progreso</option>
              <option value={'finished'}>Compleatada</option>
            </optgroup>
          </Select>
        </div>
        <div className={styles.filters}>
          <Input label={'Desde'} type={'date'} name={'fechaDespuesDe'} placeholder={''} />
          <Input label={'Hasta'} type={'date'} name={'fechaAntesDe'} placeholder={''} />
        </div>
      </div>
      <Button type={'submit'}>Filtrar</Button>
    </form>
  )
}
