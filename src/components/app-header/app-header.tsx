import headerStyles from './app-header.module.css';
import { Logo, BurgerIcon, ListIcon,ProfileIcon   } from '@ya.praktikum/react-developer-burger-ui-components'

function AppHeader() {
  return (
    <header className={headerStyles.header}>
      <nav>
        <ul className={headerStyles.menu}>
          <li className={`${headerStyles.item_active} ml-5 mr-5 mb-5 mt-5`}>
            <BurgerIcon type="primary" />
            <a className="text text_type_main-default ml-2" href='/'>Конструктор</a>
          </li>
          <li className={`${headerStyles.item} ml-5 mr-5 mb-5 mt-5`}>
            <ListIcon type="primary" />
            <a className="text text_type_main-default ml-2" href='/'>Лента заказов</a>
          </li>
        </ul>
      </nav>
      <Logo />
      <nav>
        <ul className={`${headerStyles.menu} mb-4 mt-4`}>
        <li className={`${headerStyles.item} ml-5 mr-5 mb-5 mt-5`}>
            <ProfileIcon type="primary" />
            <a className="text text_type_main-default ml-2" href='/'>Личный кабинет</a>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default AppHeader;
