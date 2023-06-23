
import React, { useContext } from "react";
import { ThemeContext } from "../../theme/ThemeProvider";
import {CgDarkMode} from 'react-icons/cg'

const ThemeChangeBtn = () => {
  const { toggleTheme } = useContext(ThemeContext);

  return <CgDarkMode 
        onClick={toggleTheme}
        size={30}
        >
    Toggle Theme
    </CgDarkMode>;
};

export default ThemeChangeBtn;