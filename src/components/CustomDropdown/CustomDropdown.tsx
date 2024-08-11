import * as React from 'react';
import { Theme, useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import './CustomDropdown.css'

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name: string, selectedOptions: ICustomDropdownOption[], theme: Theme) {
  return {
    fontWeight:
      selectedOptions.some(option => option.name === name)
        ? theme.typography.fontWeightMedium
        : theme.typography.fontWeightRegular,
  };
}

export interface ICustomDropdownOption {
  _id: number;
  name: string;
  image?: string;
}

export interface ICustomDropdown {
  placeholder: string;
  options: ICustomDropdownOption[];
  multipleSelect: boolean;
  onSelection?: (val: ICustomDropdownOption[]) => void;
}

const CustomDropdown: React.FC<ICustomDropdown> = ({ placeholder, options, multipleSelect, onSelection }) => {
  const theme = useTheme();
  const [selectedOptions, setSelectedOptions] = React.useState<ICustomDropdownOption[]>([]);

  const handleChange = (event: SelectChangeEvent<string[]>) => {
    const value = event.target.value;
    const updatedOptions = options.filter(option =>
      value.includes(option.name)
    );
    setSelectedOptions(updatedOptions);

    if (onSelection) {
      onSelection(updatedOptions);
    }
  };

  return (
    <div>
      <FormControl className='custom-dropdown' sx={{ m: 1, width: '200px', mt: 3 }}>
        <Select
          multiple={multipleSelect}
          displayEmpty
          value={selectedOptions.map(option => option.name)}
          onChange={handleChange}
          input={<OutlinedInput />}
          MenuProps={MenuProps}
          renderValue={(selected) => {
            if (selected.length === 0) {
              return <em>{placeholder}</em>;
            }

            return selected.join(', ')
          }}
          inputProps={{ 'aria-label': 'Without label' }}
        >
          <MenuItem disabled value="">
            <em> {placeholder} </em>
          </MenuItem>

          {options.map((option, index) => (
            <MenuItem
              key={index}
              value={option.name}
              style={getStyles(option.name, selectedOptions, theme)}
            >
              {option.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default CustomDropdown;
