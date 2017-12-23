/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { AdvManagementSystemTestModule } from '../../../test.module';
import { BannerPageAmsDialogComponent } from '../../../../../../main/webapp/app/entities/banner-page-ams/banner-page-ams-dialog.component';
import { BannerPageAmsService } from '../../../../../../main/webapp/app/entities/banner-page-ams/banner-page-ams.service';
import { BannerPageAms } from '../../../../../../main/webapp/app/entities/banner-page-ams/banner-page-ams.model';

describe('Component Tests', () => {

    describe('BannerPageAms Management Dialog Component', () => {
        let comp: BannerPageAmsDialogComponent;
        let fixture: ComponentFixture<BannerPageAmsDialogComponent>;
        let service: BannerPageAmsService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AdvManagementSystemTestModule],
                declarations: [BannerPageAmsDialogComponent],
                providers: [
                    BannerPageAmsService
                ]
            })
            .overrideTemplate(BannerPageAmsDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(BannerPageAmsDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BannerPageAmsService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new BannerPageAms(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.bannerPage = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'bannerPageListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new BannerPageAms();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.bannerPage = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'bannerPageListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
