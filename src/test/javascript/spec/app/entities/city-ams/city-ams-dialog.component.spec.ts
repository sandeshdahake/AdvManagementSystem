/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { AdvManagementSystemTestModule } from '../../../test.module';
import { CityAmsDialogComponent } from '../../../../../../main/webapp/app/entities/city-ams/city-ams-dialog.component';
import { CityAmsService } from '../../../../../../main/webapp/app/entities/city-ams/city-ams.service';
import { CityAms } from '../../../../../../main/webapp/app/entities/city-ams/city-ams.model';
import { ClientAmsService } from '../../../../../../main/webapp/app/entities/client-ams';

describe('Component Tests', () => {

    describe('CityAms Management Dialog Component', () => {
        let comp: CityAmsDialogComponent;
        let fixture: ComponentFixture<CityAmsDialogComponent>;
        let service: CityAmsService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AdvManagementSystemTestModule],
                declarations: [CityAmsDialogComponent],
                providers: [
                    ClientAmsService,
                    CityAmsService
                ]
            })
            .overrideTemplate(CityAmsDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CityAmsDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CityAmsService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new CityAms(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.city = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'cityListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new CityAms();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.city = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'cityListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
