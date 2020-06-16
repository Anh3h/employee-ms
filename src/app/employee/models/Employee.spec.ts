import { Employee, EmployeeDTO, mapToDTO, mapToModel } from './Employee';

describe('Employee', () => {
  it('mapToDTO', () => {
    const employee = <Employee>{ id: 'ru2862s', name: 'Samuel Johnson', salary: 125000, age: 56 };
    const employeeDTO = <EmployeeDTO>{ id: 'ru2862s', employee_name: 'Samuel Johnson', employee_salary: 125000, employee_age: 56, profile_image: '' };

    expect(mapToDTO(employee)).toBeTruthy(employeeDTO);
  });

  it('mapToDTO', () => {
    const employee = <Employee>{ id: 'ru2862s', name: 'Samuel Johnson', salary: 125000, age: 56 };
    const employeeDTO = <EmployeeDTO>{ id: 'ru2862s', employee_name: 'Samuel Johnson', employee_salary: 125000, employee_age: 56, profile_image: '' };

    expect(mapToModel(employeeDTO)).toBeTruthy(employee);
  });
});
