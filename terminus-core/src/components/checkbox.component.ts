import { NgZone, Component, Input } from '@angular/core'
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms'

@Component({
    selector: 'checkbox',
    template: require('./checkbox.component.pug'),
    styles: [require('./checkbox.component.scss')],
    providers: [
        { provide: NG_VALUE_ACCESSOR, useExisting: CheckboxComponent, multi: true },
    ]
})
export class CheckboxComponent implements ControlValueAccessor {
    @Input() model: boolean
    @Input() disabled: boolean
    @Input() text: string
    private changed = new Array<(val: boolean) => void>()

    click () {
        NgZone.assertInAngularZone()
        if (this.disabled) {
            return
        }

        this.model = !this.model
        for (let fx of this.changed) {
            fx(this.model)
        }
    }

    writeValue (obj: any) {
        this.model = obj
    }

    registerOnChange (fn: any): void {
        this.changed.push(fn)
    }

    registerOnTouched (fn: any): void {
        this.changed.push(fn)
    }

    setDisabledState (isDisabled: boolean) {
        this.disabled = isDisabled
    }
}
