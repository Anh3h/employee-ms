export interface Employee {
    id: string
    name: string,
    salary: number,
    age: number,
}

export interface EmployeeDTO {
    id: string
    employee_name: string,
    employee_salary: number,
    employee_age: number,
    profile_image: string
}

export function mapToDTO(employee: Employee): EmployeeDTO {
    let employeeDTO = <EmployeeDTO>{};

    employeeDTO.id = employee.id;
    employeeDTO.employee_age = employee.age;
    employeeDTO.employee_name = employee.name;
    employeeDTO.employee_salary = employee.salary;

    return employeeDTO;
}

export function mapToModel(employeeDTO: EmployeeDTO): Employee {
    let employee = <Employee>{};

    employee.id = employeeDTO.id;
    employee.age = employeeDTO.employee_age;
    employee.name = employeeDTO.employee_name;
    employee.salary = employeeDTO.employee_salary;

    return employee;
}