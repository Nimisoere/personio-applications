import React, { Component } from "react";
import {
  Card,
  CardBody,
  InputGroup,
  InputGroupAddon,
  Button
} from "reactstrap";
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import Formsy from "formsy-react";
import { MdCancel } from "react-icons/md";
import FilterInput from "../Form/FilterInput";

class TableFilter extends Component {
  state = { filters: [], filterState: null };

  addFilter = param => {
    if (!this.state.filters.includes(param)) {
      this.setState({
        filters: [...this.state.filters, param]
      });
    }
  };

  removeRow = index => {
    const { filters } = this.state;
    const filteredItems = filters
      .slice(0, index)
      .concat(filters.slice(index + 1, filters.length));
    this.setState(
      {
        filters: filteredItems
      },
      () => {
        if (!this.state.filters.length) {
          this.handleSubmit({});
        }
      }
    );
  };

  handleSubmit = data => {
    this.props.filterData(data);
  };

  setFilterState = data => {
    this.setState({
      filterState: data
    });
  };

  render() {
    const { columns, loading } = this.props;
    const { filters, filterState } = this.state;
    const fiterParams = columns.filter(column => column.filterable === true);

    return (
      <Card className="mb-3">
        <CardBody>
          {fiterParams && fiterParams.length && !loading ? (
            <UncontrolledDropdown>
              <DropdownToggle className="btn-sm" caret>
                Filter by
              </DropdownToggle>
              <DropdownMenu>
                {fiterParams.map((param, index) => (
                  <DropdownItem
                    onClick={() => this.addFilter(param)}
                    className="btn-sm"
                    key={index}
                  >
                    {param.name}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </UncontrolledDropdown>
          ) : null}

          <Formsy
            ref="filterForm"
            onValidSubmit={this.handleSubmit}
            onValid={this.enableButton}
            onInvalid={this.disableButton}
            onChange={this.setFilterState}
            noValidate
          >
            {filters.map((filter, index) => (
              <InputGroup key={index} className="my-3">
                <InputGroupAddon addonType="prepend">
                  {filter.name}
                </InputGroupAddon>
                <FilterInput
                  type={!!filter.filterOptions && "select"}
                  options={filter.filterOptions}
                  name={filter.accessor}
                  value={filterState && filterState[filter.accessor]}
                />
                <InputGroupAddon addonType="append">
                  <Button
                    color="secondary"
                    onClick={() => this.removeRow(index)}
                  >
                    <MdCancel />
                  </Button>
                </InputGroupAddon>
              </InputGroup>
            ))}
            {!!filters.length && (
              <div className="text-right">
                <button type="submit" className="btn btn-brand-2">
                  Apply
                </button>
              </div>
            )}
          </Formsy>
        </CardBody>
      </Card>
    );
  }
}

export default TableFilter;
